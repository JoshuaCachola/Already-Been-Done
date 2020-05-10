'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Skaters", [{
      firstName: "David",
      lastName: "Phommachanh",
      username: "crookiemonster",
      email: "crookiemonster@gmail.com",
      hashedPassword: "$2a$10$YEqFIcgLZXIgS63WNvUKPetcQv7eTMkBFYYyxFsVsS1HV1ltSOCH2",
      phoneNumber: "8888888888",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Skaters", null, {});
  }
};
