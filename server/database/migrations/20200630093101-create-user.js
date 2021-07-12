'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      uniqueId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Admin'
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}
