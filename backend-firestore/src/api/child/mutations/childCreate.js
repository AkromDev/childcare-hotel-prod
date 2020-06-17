const ChildService = require('../../../services/childService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  childCreate(data: ChildInput!): Child!
`;

const resolver = {
  childCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.childCreate,
    );

    return new ChildService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;
