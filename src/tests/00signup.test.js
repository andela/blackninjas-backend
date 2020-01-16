import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import UserServices from '../services/user.service';
import userData from './user/userData';
import db from '../database/models';

chai.use(chaiHttp);
chai.should();
const { user, secondUser } = userData;
const { firstName, ...invalidData } = user;
describe('Signup tests', () => {
  before(async () => {
    await db.user.create(secondUser);
  });
  it('user created successfully', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(user).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });


  it('Users should receive descriptive signup/Registration validation errors', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(invalidData)
      .end((err, res) => {
        res.should.have.status(422);
        chai.expect(res.body[0]).to.eq(undefined);
        done();
      });
  });
  it('it should log error', async () => {
    const u = await UserServices.findUserByEmail();
    chai.expect(u).to.eq(undefined);
  });

  it('User should not be able to signup with email which is already registered', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(secondUser)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});
