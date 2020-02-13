
module.exports = {
  up: (queryInterface) =>
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    queryInterface.bulkInsert('users', [{
      firstName: 'Jordan',
      lastName: 'Kayinamura',
      country: 'Rwanda',
      gender: 'male',
      birthdate: '1997-12-30',
      isVerified: 'true',
      email: 'jordankayinamura@gmail.com',
      password: '$2y$12$RftUykWaCUKDOuXe3qx.WO5eRx7pvGeiaqyW0egkiEUWy35Nc9BEi',
      authtype: 'local',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'MUGI',
      lastName: 'John',
      country: 'rwanda',
      gender: 'male',
      birthdate: '1996-12-04',
      isVerified: 'true',
      email: 'mujohn27@gmail.com',
      password: '$2b$10$65Ws0cWYTY63RG.kMGThbu6kRJu6/3kAq.Vxb9dGJKkc/Hwny/NVK',
      authtype: 'local',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */queryInterface.bulkDelete('users', null, {})

};
