const ChildService = require('../../../services/childService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  childUpdate(id: String!, data: ChildInput!): Child!
`;

const resolver = {
  childUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.childEdit,
    );

    return new ChildService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
