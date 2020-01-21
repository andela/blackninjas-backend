import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

use(chaiHttp);
const token2 = GenerateToken({
  email: 'beni300@gmail.com', firstName: 'jaja', isVerified: true, id: 20
});
const token = GenerateToken({
  email: 'beni3000@gmail.com', firstName: 'jaja', isVerified: true, id: 30
});
const email = 'beni3000@gmail.com';
const email2 = 'beni300@gmail.com';
const unaveilableAccountToken = GenerateToken({
  email: 'invalid0@gmail.com', firstName: 'jaja', isVerified: true, id: 40
});

describe('/users/role', () => {
  before(async () => {
    await db.user.create({
      id: 20,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'beni300@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: true,
      token,
      role: 'admin'
    });
    await db.user.create({
      id: 30,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'beni3000@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: true,
      token: token2
    });
    await db.user.create({
      id: 40,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'invalid0@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: false,
      token: unaveilableAccountToken
    });
    await db.userRole.create({
      name: 'manager',
    });
    await db.userRole.create({
      name: 'travel-team-member',
    });
    await db.userRole.create({
      name: 'travel-administrator',
    });
    await db.userRole.create({
      name: 'admin',
    });
    await db.userRole.create({
      name: 'requester',
    });
    await db.userRole.create({
      name: 'supplier',
    });
  });
  it('should check if page number has data', (done) => {
    chai
      .request(app)
      .get('/api/v1/users?page=3')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(404);
        chai.expect(res.body.error).to.eq('No User Found');
        done();
      });
  });
  it('should check if page number is not a string and then bring first page', (done) => {
    chai
      .request(app)
      .get('/api/v1/users?page=jaja')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).to.eq('Users');
        done();
      });
  });
  it('should check if page number is greater than one and then bring first page', (done) => {
    chai
      .request(app)
      .get('/api/v1/users?page=-1')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).to.eq('Users');
        done();
      });
  });
  it('user check if a user is available when he is going to update role', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/30/settings')
      .set('token', `Bearer ${token2}`)
      .send({
        role: 'manager',
        email
      })
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).to.eq('User Role successfully updated');
        done();
      });
  });
  it('user check if a role added is correct', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/30/settings')
      .set('token', `Bearer ${token2}`)
      .send({
        role: 'managerer',
        email
      })
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('We dont support that role');
        done();
      });
  });
  it('user check if a user is verified', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/40/settings')
      .set('token', `Bearer ${unaveilableAccountToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });
  it('user check if a user is an admin', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/40/settings')
      .set('token', `Bearer ${token}`)
      .send({
        role: 'manager',
        email: email2
      })
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('You can not perform this Action');
        done();
      });
  });
});
