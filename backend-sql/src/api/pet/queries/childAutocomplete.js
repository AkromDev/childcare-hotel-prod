const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const ChildService = require('../../../services/childService');

const schema = `
  childAutocomplete(query: String, owner: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  childAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.childAutocomplete,
    );

    const filter = {
      query: args.query,
      owner: args.owner,
    };

    return new ChildService(context).findAllAutocomplete(
      filter,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
