const ChildService = require('../../../services/childService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  childList(filter: ChildFilterInput, limit: Int, offset: Int, orderBy: ChildOrderByEnum): ChildPage!
`;

const resolver = {
  childList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.childRead,
    );

    return new ChildService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
