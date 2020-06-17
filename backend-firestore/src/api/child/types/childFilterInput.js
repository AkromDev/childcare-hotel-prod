const schema = `
  input ChildFilterInput {
    id: String
    owner: String
    name: String
    type: ChildTypeEnum
    breed: String
    size: ChildSizeEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
