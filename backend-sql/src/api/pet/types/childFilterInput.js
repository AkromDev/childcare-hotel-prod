const schema = `
  input ChildFilterInput {
    id: String
    owner: String
    name: String
    type: ChildTypeEnum
    size: ChildSizeEnum
    createdAtRange: [ DateTime ]
  }
  `;
// breed: String

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
