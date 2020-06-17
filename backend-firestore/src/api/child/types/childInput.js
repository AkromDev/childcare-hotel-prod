const schema = `
  input ChildInput {
    owner: String!
    name: String!
    type: ChildTypeEnum!
    size: ChildSizeEnum!
    bookings: [ String! ]
  }
  `;
// breed: String!

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
