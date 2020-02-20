import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

chai.use(chaiHttp);
chai.should();

const token = GenerateToken({ email: 'resetpassword@gmail.com', isVerified: 'true', id: '4' });
const token2 = GenerateToken({ email: 'resetpassword2@gmail.com', isVerified: 'false', id: '4' });
const unaveilableAccountToken = GenerateToken({ email: 'invalid@gmail.com', isVerified: 'false', id: '4' });

describe('user should receive a link to reset password', () => {
  before(async () => {
    // await db.user.destroy({ where: {}, force: true });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'resetpassword@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      isVerified: true,
      token
    });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'resetpassword2@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      isVerified: false,
      token: token2
    });
    await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'resetpassword23@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      password: EncryptPassword('shemaeric'),
      phoneNumber: '0785571790',
      authtype: 'google',
      isVerified: false,
      token: token2
    });
  });

  it('user check if a user is available', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/forgetpassword')
      .send({ email: 'invalid@gmail.com' })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('user should receive a reset password link', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/forgetpassword')
      .send({ email: 'resetpassword2@gmail.com' })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should not send reset link when the account created using social platforms ', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/forgetpassword')
      .send({ email: 'resetpassword23@gmail.com' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});


describe('user should be able to reset password', () => {
  it('it should check if password and confirm password match', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .set('token', `Bearer ${token2}`)
      .send({ password: 'truepassword', confirmPassword: 'falsepassword' })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should check if account is verified', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .set('token', `Bearer ${unaveilableAccountToken}`)
      .send({ password: 'truepassword', confirmPassword: 'truepassword' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('user should successfuly reset his or her account', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .set('token', `Bearer ${token}`)
      .send({ password: 'truepassword', confirmPassword: 'truepassword' })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('user should successfuly reset his or her account', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .set('token', `Bearer ${token2}`)
      .send({ password: 'truepassword', confirmPassword: 'truepassword' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if a header is set', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .send({ password: 'truepassword', confirmPassword: 'truepassword' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if there is Bearer in header', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .set('token', `xxxxx ${token2}`)
      .send({ password: 'truepassword', confirmPassword: 'truepassword' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if token has provided', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetpassword')
      .set('token', 'Bearer')
      .send({ password: 'truepassword', confirmPassword: 'truepassword' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
