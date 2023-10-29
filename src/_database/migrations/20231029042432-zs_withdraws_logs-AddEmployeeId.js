'use strict';

const queryUp = 'UPDATE zs_withdraws_logs WL, zs_users USERS SET WL.employeeId = USERS.id WHERE WL.employee = USERS.username;'
const queryDown = 'UPDATE zs_withdraws_logs WL, zs_users USERS SET WL.employee = USERS.username WHERE WL.employeeId = USERS.id;'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('zs_withdraws_logs', 'employeeId', {
        type: Sequelize.INTEGER,
        after: 'withdrawId',
        references: {
          model: 'zs_users',
          key: 'id'
        }
      }),
      await queryInterface.sequelize.query(queryUp),
      await queryInterface.removeColumn('zs_withdraws_logs', 'employee'),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('zs_withdraws_logs', 'employee', {
        type: Sequelize.STRING,
        after: 'withdrawId'
      }),
      await queryInterface.sequelize.query(queryDown),
      await queryInterface.removeColumn('zs_withdraws_logs', 'employeeId'),
    ];
  }
};

