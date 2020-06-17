const userFixture = require('./userFixture');
const childFixture = require('./childFixture');
const bookingFixture = require('./bookingFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  child: childFixture,
  booking: bookingFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
