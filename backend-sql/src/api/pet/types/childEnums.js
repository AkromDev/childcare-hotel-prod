const schema = `
  enum ChildTypeEnum {
    boy
    girl
  }

  enum ChildSizeEnum {
    toddler
    preschooler
    schoolAged
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
