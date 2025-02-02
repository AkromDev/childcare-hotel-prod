const AbstractEntityRepository = require('./abstractEntityRepository');
const admin = require('firebase-admin');
const FirebaseQuery = require('../utils/firebaseQuery');
const Booking = require('../models/booking');
const moment = require('moment');
const bookingStatus = require('../../enumerators/bookingStatus');

class BookingRepository extends AbstractEntityRepository {
  constructor() {
    super(new Booking());
  }

  async refreshTwoWayRelations(record, options) {
    await this.refreshTwoWayRelationOneToMany(
      record,
      'child',
      'child',
      'bookings',
      options,
    );
  }

  async destroyFromRelations(id, options) {
    await this.destroyRelationToMany(
      id,
      'child',
      'bookings',
      options,
    );
  }

  async findById(id) {
    const record = await this.findDocument('booking', id);
    return this.populate(record);
  }

  async findAndCountAll(
    {
      requestedAttributes,
      filter,
      limit,
      offset,
      orderBy,
    } = {
      requestedAttributes: null,
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
  ) {
    const query = FirebaseQuery.forList({
      limit,
      offset,
      orderBy: orderBy || 'createdAt_DESC',
    });

    if (filter) {
      if (filter.id) {
        query.appendId('id', filter.id);
      }

      if (filter.owner) {
        query.appendId('owner', filter.owner);
      }

      if (filter.child) {
        query.appendId('child', filter.child);
      }

      if (filter.arrivalRange) {
        query.appendRange('arrival', filter.arrivalRange);
      }

      if (filter.departureRange) {
        query.appendRange(
          'departure',
          filter.departureRange,
        );
      }

      if (filter.period) {
        query.appendOverlap(
          'arrival',
          'departure',
          filter.period,
        );
      }

      if (filter.status) {
        query.appendEqual('status', filter.status);
      }

      if (filter.feeRange) {
        query.appendRange('fee', filter.feeRange);
      }

      if (filter.createdAtRange) {
        query.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    const collection = await admin
      .firestore()
      .collection(`booking`)
      .get();

    const all = this.mapCollection(collection);
    const rows = await this.populateAll(query.rows(all));
    const count = query.count(all);

    return { rows, count };
  }

  async findAllAutocomplete(filter, limit) {
    const query = FirebaseQuery.forAutocomplete({
      limit,
      orderBy: 'id_ASC',
    });

    if (filter && filter.search) {
      query.appendId('id', filter.search);
    }

    const collection = await admin
      .firestore()
      .collection(`booking`)
      .get();

    const all = this.mapCollection(collection);
    let rows = query.rows(all);

    if (filter && filter.owner) {
      rows = rows.filter(
        (row) => row.owner === filter.owner,
      );
    }

    return rows.map((record) => ({
      id: record.id,
      label: record['id'],
    }));
  }

  async populateAll(records) {
    return await Promise.all(
      records.map((record) => this.populate(record)),
    );
  }

  async populate(record) {
    if (!record) {
      return record;
    }

    record.child = await this.findRelation(
      'child',
      record.child,
    );

    record.owner = await this.findRelation(
      'user',
      record.owner,
    );

    return record;
  }

  async existsForChild(childId) {
    const collection = await admin
      .firestore()
      .collection(`booking`)
      .where('child', '==', childId)
      .limit(1)
      .get();

    return collection.size > 0;
  }

  async countActiveBookingsInPeriod(
    start,
    end,
    idToExclude,
  ) {
    // departure >= start and arrival <= end
    let query = await admin
      .firestore()
      .collection(`booking`)
      .where('departure', '>=', start)
      .get();

    const results = this.mapCollection(query);

    if (!results || !results.length) {
      return 0;
    }

    const arrivalFilter = (item) =>
      moment(item.arrival).isSameOrBefore(end);

    const statusFilter = (item) =>
      [
        bookingStatus.BOOKED,
        bookingStatus.PROGRESS,
      ].includes(item.status);

    const idToExcludeFilter = (item) =>
      !idToExclude || item.id !== idToExclude;

    return results
      .filter(arrivalFilter)
      .filter(idToExcludeFilter)
      .filter(statusFilter).length;
  }
}

module.exports = BookingRepository;
