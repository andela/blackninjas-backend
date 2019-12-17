
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
      firstName: 'MUGI',
      lastName: 'John',
      country: 'rwanda',
      gender: 'male',
      birthday: '1996-12-04',
      isVerified: 'false',
      verificationCode: null,
      phoneNumber: '0785571790',
      email: 'mujohn26@gmail.com',
      password: '$2b$10$65Ws0cWYTY63RG.kMGThbu6kRJu6/3kAq.Vxb9dGJKkc/Hwny/NVK',
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
