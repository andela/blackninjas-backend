// TODO: This will be uncommented when this PR is merged with the one which have signup route
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../index';
// import UserServices from '../services/user.service';

// chai.use(chaiHttp);
// chai.should();

// describe('Signup tests', () => {
//   const user = {
//     email: 'nsengimanavedadom@gmail.com',
//     firstname: 'Nsengimana',
//     lastname: 'Veda Dominique',
//     password: 'Veda11111111',
//     country: 'Rwanda',
//     gender: 'Male',
//     birthday: '05/05/1994'
//   };

//   const { firstname, ...invalidData } = user;

//   it('Users should receive descriptive signup/Registration validation errors', (done) => {
//     chai.request(app).post('/api/v1/auth/signup')
//       .send(invalidData)
//       .end((err, res) => {
//         res.should.have.status(422);
//         chai.expect(res.body[0]).to.eq('Provided first name is not valid.');
//         done();
//       });
//   });
//   it('User should not be able to signup with email which is already registered', (done) => {
//     chai.request(app).post('/api/v1/auth/signup')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
//   it('User should be allowed to continue if provided data are valid', (done) => {
//     chai.request(app).post('/api/v1/auth/signup')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(409);
//         done();
//       });
//   });
//   it('it should log error', async () => {
//     const u = await UserServices.findUserByEmail();
//     chai.expect(u).to.eq(null);
//   });
// });
