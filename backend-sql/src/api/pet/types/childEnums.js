const schema = `
  enum ChildTypeEnum {
    cat
    dog
  }

  enum ChildSizeEnum {
    small
    medium
    large
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
