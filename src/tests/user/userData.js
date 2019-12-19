import faker from 'faker';


const userData = {
  user: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    country: faker.address.county(),
    password: '2345678976543'
  }
};
export default userData;
