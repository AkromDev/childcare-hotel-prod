const ChildService = require('../../../services/childService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  childFind(id: String!): Child!
`;

const resolver = {
  childFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.childRead,
    );

    return new ChildService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
