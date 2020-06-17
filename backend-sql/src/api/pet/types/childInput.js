const schema = `
  input ChildInput {
    owner: String!
    name: String!
    type: ChildTypeEnum!
    breed: String!
    size: ChildSizeEnum!
    bookings: [ String! ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
