'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SkatePosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING(255)),
      },
      skateSpotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "SkateSpots" }
      },
      skaterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Skaters" }
      },
      caption: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SkatePosts');
  }
};
