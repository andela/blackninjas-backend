import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../database/models';
import GenToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

use(chaiHttp);
const token2 = GenToken.GenerateToken('benit300@gmail.com', 'true', '4');
const unaveilableAccountToken = GenToken.GenerateToken('invalid@gmail.com', 'shemaeric', 'false');

describe('/auth/profile', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.user.create({
      firstName: 'benit',
      lastName: 'havuga',
      email: 'benit300@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: true
    });
    await db.user.create({
      firstName: 'benit',
      lastName: 'havuga',
      email: 'benit3000@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: false
    });
  });

  it('user check if a user is not available on view profile', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/profile')
      .set('token', `Bearer ${unaveilableAccountToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('user check if a user is available on view profile', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/profile')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('user check if a user is available on edit profile', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/profile')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
