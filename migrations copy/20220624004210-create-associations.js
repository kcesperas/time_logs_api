module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'businessId', {
          type: Sequelize.DataTypes.INTEGER,
            references: {
              model: 'businesses',
              key: 'id'
            },
        allowNull: true
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'businessId', { transaction: t }),
      ]);
    });
  }
};