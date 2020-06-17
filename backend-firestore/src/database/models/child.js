const types = require('./types');
const AbstractEntityModel = require('./abstractEntityModel');

module.exports = class Child extends AbstractEntityModel {
  constructor() {
    super('child', 'child', {
      owner: new types.RelationToOne(),
      name: new types.String(null, 255),
      type: new types.Enumerator(['boy', 'girl']),
      breed: new types.String(null, 255),
      size: new types.Enumerator([
        'toddler',
        'preschooler',
        'schoolAged',
      ]),
      bookings: new types.RelationToMany(),
      importHash: new types.String(null, 255),
    });
  }
};
