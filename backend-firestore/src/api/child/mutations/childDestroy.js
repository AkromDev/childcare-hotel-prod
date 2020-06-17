const ChildService = require('../../../services/childService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  childDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  childDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.childDestroy,
    );

    await new ChildService(context).destroyAll(args.ids);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
