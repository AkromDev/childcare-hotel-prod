const schema = `
  type Child {
    id: String!
    owner: User
    name: String
    type: ChildTypeEnum
    size: ChildSizeEnum
    bookings: [ Booking! ]
    createdAt: DateTime
    updatedAt: DateTime
  }
  `;
// breed: String

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
