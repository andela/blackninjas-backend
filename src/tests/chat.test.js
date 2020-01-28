import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

use(chaiHttp);
const token2 = GenerateToken({
  email: 'bei300@gmail.com', firstName: 'jaja', isVerified: true, id: 122
});
const token = GenerateToken({
  email: 'bei3000@gmail.com', firstName: 'jaja', isVerified: true, id: 121
});
const unaveilableAccountToken = GenerateToken({
  email: 'invaid0@gmail.com', firstName: 'jaja', isVerified: true, id: 122
});

describe('/users/messages', () => {
  before(async () => {
    await db.user.create({
      id: 121,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'bei300@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: true,
      token,
      role: 'requester'
    });
    await db.user.create({
      id: 122,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'bei3000@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: true,
      token: token2
    });
    await db.user.create({
      id: 123,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'invaid0@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: false,
      token: unaveilableAccountToken
    });
  });
  it('should check and return all users with their online status', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('user check for chat messages by specifying specific sender', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/121')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).to.eq('Messages');
        done();
      });
  });
  it('user get all available users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/messages')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).to.eq('users available');
        done();
      });
  });
  it('user check if a user is verified', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/messages')
      .set('token', `Bearer ${unaveilableAccountToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });
});
