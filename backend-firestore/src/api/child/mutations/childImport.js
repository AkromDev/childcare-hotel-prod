const ChildService = require('../../../services/childService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  childImport(data: ChildInput!, importHash: String!): Boolean
`;

const resolver = {
  childImport: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.childImport,
    );

    await new ChildService(context).import(
      args.data,
      args.importHash,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
