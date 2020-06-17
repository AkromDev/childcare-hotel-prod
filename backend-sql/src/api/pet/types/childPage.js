const schema = `
  type ChildPage {
    rows: [Child!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
