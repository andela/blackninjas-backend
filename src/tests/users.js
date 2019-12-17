import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';
import GenToken from '../helpers/token';

chai.use(chaiHttp);
chai.should();

const token = GenToken('shema@gmail.com', 'shemaeric', 'false');
const token2 = GenToken('shemaeric@gmail.com', 'shemaeric', 'false');
const invalidToken = GenToken('invalid@gmail.com', 'shemaeric', 'false');

describe('user velify email', () => {
  before(async () => {
    await db.users.destroy({ where: {}, force: true });
    await db.users.create({
      firstname: 'shema',
      lastname: 'eric',
      email: 'shema@gmail.com',
      password: 'shemq',
      active: false
    });
    await db.users.create({
      firstname: 'shema',
      lastname: 'eric',
      email: 'shemaeric@gmail.com',
      password: 'shemaeric',
      active: true
    });
  });

  it('user should activate account', (done) => {
    chai
      .request(app)
      .get(`/api/v1/activate/${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should  check if user exist', (done) => {
    chai
      .request(app)
      .get(`/api/v1/activate/${invalidToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should check if user accoutn is activated', (done) => {
    chai
      .request(app)
      .get(`/api/v1/activate/${token2}`)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('it should check if token is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/activate/123456787654345')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should check if there is other kinf of error', (done) => {
    chai
      .request(app)
      .get('/api/v1/activate/fhgjgkhlhgf657896')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // it('it should check if there is a token', (done) => {
  //   chai
  //     .request(app)
  //     .get('/api/v1/activate')
  //     .set('Authorizations', 'Bearer ')
  //     .end((err, res) => {
  //       res.should.have.status(401);
  //       done();
  //     });
  // });
});
