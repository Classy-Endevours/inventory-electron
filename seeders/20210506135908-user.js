const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'admin@123';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
      return queryInterface.bulkInsert(
        'users',
        [
          {
            userName: 'admin',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
