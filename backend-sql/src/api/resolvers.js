const mergeResolvers = require('./shared/utils/mergeGraphqlResolvers');

const sharedTypes = require('./shared/types');

const settingsTypes = require('./settings/types');
const settingsQueries = require('./settings/queries');
const settingsMutations = require('./settings/mutations');

const authTypes = require('./auth/types');
const authQueries = require('./auth/queries');
const authMutations = require('./auth/mutations');

const iamTypes = require('./iam/types');
const iamQueries = require('./iam/queries');
const iamMutations = require('./iam/mutations');

const auditLogTypes = require('./auditLog/types');
const auditLogQueries = require('./auditLog/queries');
const auditLogMutations = require('./auditLog/mutations');

const childTypes = require('./child/types');
const childQueries = require('./child/queries');
const childMutations = require('./child/mutations');

const bookingTypes = require('./booking/types');
const bookingQueries = require('./booking/queries');
const bookingMutations = require('./booking/mutations');

const types = [
  ...sharedTypes,
  ...iamTypes,
  ...authTypes,
  ...auditLogTypes,
  ...settingsTypes,
  ...childTypes,
  ...bookingTypes,
].map((type) => type.resolver);

const queries = [
  ...iamQueries,
  ...authQueries,
  ...auditLogQueries,
  ...settingsQueries,
  ...childQueries,
  ...bookingQueries,
].map((query) => query.resolver);

const mutations = [
  ...iamMutations,
  ...authMutations,
  ...auditLogMutations,
  ...settingsMutations,
  ...childMutations,
  ...bookingMutations,
].map((mutation) => mutation.resolver);

module.exports = mergeResolvers(types, queries, mutations);
