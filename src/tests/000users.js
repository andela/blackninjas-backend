import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';
import GenToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

chai.use(chaiHttp);
chai.should();

const token = GenToken.GenerateToken('shema@gmail.com', 'shemaeric', 'false');
const token2 = GenToken.GenerateToken('shemaeric@gmail.com', 'shemaeric', 'false');
const invalidToken = GenToken.GenerateToken('invalid@gmail.com', 'shemaeric', 'false');

describe('user velify email', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shema@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: false
    });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shemaeric@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: true
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
        res.should.have.status(404);
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
});
