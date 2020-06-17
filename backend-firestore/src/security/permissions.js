const Roles = require('./roles');
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [roles.manager, roles.employee],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [roles.manager, roles.employee],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [roles.manager],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [roles.manager, roles.employee],
      },
      iamChangeStatus: {
        id: 'iamChangeStatus',
        allowedRoles: [roles.manager],
      },
      iamRemove: {
        id: 'iamRemove',
        allowedRoles: [roles.manager],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [roles.manager, roles.employee],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.manager],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.manager],
      },
      childImport: {
        id: 'childImport',
        allowedRoles: [roles.manager, roles.employee],
      },
      childCreate: {
        id: 'childCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
        allowedStorageFolders: ['child'],
      },
      childEdit: {
        id: 'childEdit',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
        allowedStorageFolders: ['child'],
      },
      childDestroy: {
        id: 'childDestroy',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
        allowedStorageFolders: ['child'],
      },
      childRead: {
        id: 'childRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
      },
      childAutocomplete: {
        id: 'childAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
      },

      bookingImport: {
        id: 'bookingImport',
        allowedRoles: [roles.manager],
      },
      bookingCreate: {
        id: 'bookingCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingEdit: {
        id: 'bookingEdit',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingDestroy: {
        id: 'bookingDestroy',
        allowedRoles: [roles.manager],
        allowedStorageFolders: ['booking'],
      },
      bookingRead: {
        id: 'bookingRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
      },
      bookingAutocomplete: {
        id: 'bookingAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.childOwner,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

module.exports = Permissions;
