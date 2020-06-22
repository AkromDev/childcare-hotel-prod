const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const child = sequelize.define(
    'child',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['boy', 'girl'],
      },
      size: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['toddler', 'preschooler', 'schoolAged'],
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  child.associate = (models) => {
    models.child.belongsTo(models.user, {
      as: 'owner',
      constraints: false,
    });

    models.child.hasMany(models.booking, {
      as: 'bookings',
      constraints: false,
      foreignKey: 'childId',
    });

    models.child.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.child.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return child;
};
