'use strict';

const queryUp = 'UPDATE zs_partners_bots BOTS, zs_users USERS SET BOTS.employeeId = USERS.id WHERE BOTS.employee = USERS.username;'
const queryDown = 'UPDATE zs_partners_bots BOTS, zs_users USERS SET BOTS.employee = USERS.username WHERE BOTS.employeeId = USERS.id;'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('zs_partners_bots', 'employeeId', {
        type: Sequelize.INTEGER,
        after: 'botName',
        references: {
          model: 'zs_users',
          key: 'id'
        }
      }),
      await queryInterface.sequelize.query(queryUp),
      await queryInterface.removeColumn('zs_partners_bots', 'employee'),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('zs_partners_bots', 'employee', {
        type: Sequelize.STRING,
        after: 'botName'
      }),
      await queryInterface.sequelize.query(queryDown),
      await queryInterface.removeColumn('zs_partners_bots', 'employeeId'),
    ];
  }
};

