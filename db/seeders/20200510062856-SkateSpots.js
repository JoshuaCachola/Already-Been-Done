'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SkateSpots", [{

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SkateSpots", null, {});
  }
};
