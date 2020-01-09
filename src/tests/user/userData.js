import faker from 'faker';


const userData = {
  user: {
    id: 270,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'resetpasswordh@gmail.com',
    country: faker.address.county(),
    password: '2345678976543',
    isVerified: false
  },
  secondUser: {
    id: 31,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'secondUser@gmail.com',
    country: faker.address.county(),
    password: '2345678976543',
    isVerified: false
  }
};
export default userData;
