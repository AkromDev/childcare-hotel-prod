const ChildRepository = require('../database/repositories/childRepository');
const ValidationError = require('../errors/validationError');
const AbstractRepository = require('../database/repositories/abstractRepository');
const UserRoleChecker = require('./iam/userRoleChecker');
const ForbiddenError = require('../errors/forbiddenError');
const BookingRepository = require('../database/repositories/bookingRepository');

module.exports = class ChildService {
  constructor({ currentUser, language }) {
    this.repository = new ChildRepository();
    this.bookingRepository = new BookingRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  async create(data) {
    await this._validateCreate(data);

    const batch = await AbstractRepository.createBatch();

    try {
      const record = await this.repository.create(data, {
        batch: batch,
        currentUser: this.currentUser,
      });

      await AbstractRepository.commitBatch(batch);

      return this.repository.findById(record.id);
    } catch (error) {
      throw error;
    }
  }

  async _validateCreate(data) {
    if (UserRoleChecker.isChildOwner(this.currentUser)) {
      if (data.owner !== this.currentUser.id) {
        throw new ForbiddenError(this.language);
      }
    }
  }

  async update(id, data) {
    await this._validateUpdate(id, data);

    const batch = await AbstractRepository.createBatch();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          batch,
          currentUser: this.currentUser,
        },
      );

      await AbstractRepository.commitBatch(batch);

      return this.repository.findById(record.id);
    } catch (error) {
      throw error;
    }
  }

  async _validateUpdate(id, data) {
    if (UserRoleChecker.isChildOwner(this.currentUser)) {
      data.owner = this.currentUser.id;
      await this._validateIsSameOwner(id);
    }
  }

  async _validateIsSameOwner(id) {
    await this.findById(id);
  }

  async destroyAll(ids) {
    const batch = await AbstractRepository.createBatch();

    try {
      for (const id of ids) {
        await this._validateDestroy(id);

        await this.repository.destroy(id, {
          batch,
          currentUser: this.currentUser,
        });
      }

      await AbstractRepository.commitBatch(batch);
    } catch (error) {
      throw error;
    }
  }

  async _validateDestroy(id) {
    if (UserRoleChecker.isChildOwner(this.currentUser)) {
      await this._validateIsSameOwner(id);
    }

    const existsBookingForChild = await this.bookingRepository.existsForChild(
      id,
    );

    if (existsBookingForChild) {
      throw new ValidationError(
        this.language,
        'entities.child.validation.bookingExists',
      );
    }
  }

  async findById(id) {
    const record = await this.repository.findById(id);
    await this._validateFindById(record);
    return record;
  }

  async _validateFindById(record) {
    if (UserRoleChecker.isChildOwner(this.currentUser)) {
      if (
        record.owner &&
        record.owner.id !== this.currentUser.id
      ) {
        throw new ForbiddenError(this.language);
      }
    }
  }

  async findAllAutocomplete(filter, limit) {
    if (UserRoleChecker.isChildOwner(this.currentUser)) {
      if (
        !filter ||
        !filter.owner ||
        filter.owner !== this.currentUser.id
      ) {
        throw new ForbiddenError(this.language);
      }
    }

    return this.repository.findAllAutocomplete(
      filter,
      limit,
    );
  }

  async findAndCountAll(args) {
    if (UserRoleChecker.isChildOwner(this.currentUser)) {
      args.filter = {
        ...args.filter,
        owner: this.currentUser.id,
      };
    }

    return this.repository.findAndCountAll(args);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await this.repository.count({
      importHash,
    });

    return count > 0;
  }
};
