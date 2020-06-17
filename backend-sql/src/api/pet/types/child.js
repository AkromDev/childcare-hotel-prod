const schema = `
  type Child {
    id: String!
    owner: User
    name: String
    type: ChildTypeEnum
    breed: String
    size: ChildSizeEnum
    bookings: [ Booking! ]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
