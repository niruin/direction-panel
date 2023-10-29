'use strict';

const queryUp = 'UPDATE zs_partners_logs PL, zs_users USERS SET PL.employeeId = USERS.id WHERE PL.employee = USERS.username;'
const queryDown = 'UPDATE zs_partners_logs PL, zs_users USERS SET PL.employee = USERS.username WHERE PL.employeeId = USERS.id;'
const queryDownFillPartnerName = 'UPDATE zs_partners_logs PL, zs_partners P SET PL.partnerName = P.partnerName WHERE PL.partnerId = P.partnerid;'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('zs_partners_logs', 'employeeId', {
        type: Sequelize.INTEGER,
        after: 'partnerId',
        references: {
          model: 'zs_users',
          key: 'id'
        }
      }),
      await queryInterface.sequelize.query(queryUp),
      await queryInterface.removeColumn('zs_partners_logs', 'employee'),
      await queryInterface.removeColumn('zs_partners_logs', 'partnerName'),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('zs_partners_logs', 'partnerName', {
        type: Sequelize.STRING,
        after: 'partnerId'
      }),
      await queryInterface.sequelize.query(queryDownFillPartnerName),
      await queryInterface.addColumn('zs_partners_logs', 'employee', {
        type: Sequelize.STRING,
        after: 'partnerName'
      }),
      await queryInterface.sequelize.query(queryDown),
      await queryInterface.removeColumn('zs_partners_logs', 'employeeId'),
    ];
  }
};

