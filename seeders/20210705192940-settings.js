module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      return queryInterface.bulkInsert(
        'settings',
        [
          {
            name: 'Rajesh Exports',
            address: 'Nhava Sheva Port',
            mobile1: '1234567890',
            mobile2: '1234567891',
            gstNo: 'ASDFVJNV123AS',
            email: 'rajeshexports@gmail.com',
            isDefault: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    } catch (error) {
      console.log({ error });
    }
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('settings', null, {});
  },
};
