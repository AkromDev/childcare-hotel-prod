const genericFixture = require('./genericFixture');
const ChildRepository = require('../database/repositories/childRepository');

const childFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new ChildRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = childFixture;
