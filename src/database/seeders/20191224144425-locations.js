
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('locations', [
    {
      city: 'kigali',
      country: 'Rwanda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'kampala',
      country: 'Uganda',

      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'goma',
      country: 'DRC',

      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'nairobi',
      country: 'Kenya',

      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'dar-es-salam',
      country: 'Tanzania',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('locations', null, {})
};
