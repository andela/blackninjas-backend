import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

chai.use(chaiHttp);
chai.should();

const token = GenerateToken({ email: 'shema@gmail.com', isVerified: 'false', id: '4' });
const token2 = GenerateToken({ email: 'shemaeric@gmail.com', isVerified: 'false', id: '4' });
const invalidToken = GenerateToken({ email: 'invalid@gmail.com', isVerified: 'false', id: '4' });

describe('user velify email', () => {
  before(async () => {
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shema@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      isVerified: false,
      token
    });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shemaeric@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      isVerified: true,
      token: token2
    });
  });

  it('user should activate account', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should  check if user exist', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${invalidToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if user accoutn is activated', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/activate/${token2}`)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('it should check if token is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/activate/123456787654345')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if there is other kinf of error', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/activate/fhgjgkhlhgf657896')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('it should logout a user', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/logout')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should not logout a user who is alread loged out', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/logout')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
