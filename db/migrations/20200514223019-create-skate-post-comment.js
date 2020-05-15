'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SkatePostComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      skatePostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "SkatePosts" }
      },
      skaterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Skaters" }
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
    return queryInterface.dropTable('SkatePostComments');
  }
};