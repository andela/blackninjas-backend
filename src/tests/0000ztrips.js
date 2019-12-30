import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import tripsData from './user/tripsData';
import EncryptPassword from '../helpers/Encryptor';

chai.use(chaiHttp);
chai.should();
let token;
let token2;
describe('trips tests', () => {
  const { trip, returnTrip } = tripsData;
  const { Sametrip } = tripsData;
  const { originFalse } = tripsData;
  const { destinationFalse } = tripsData;
  before(async () => {
    const user = await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shemad@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: true
    });
    token2 = GenerateToken({ email: 'shemad@gmail.com', isVerified: true, id: user.id });
    await user.update({ token: token2 });

    const usera = await db.user.create({
      firstName: 'shema',
      lastName: 'eric',
      email: 'shemadd@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: false
    });
    token = GenerateToken({ email: 'shemadd@gmail.com', isVerified: false, id: usera.id });
    await usera.update({ token });

    await db.locations.create({
      city: 'Nairobi'
    });
    await db.locations.create({
      city: 'Kampala'
    });
    await db.locations.create({
      city: 'Goma'
    });
    await db.accomodation.create({
      id: 1,
      name: 'marriot',
      description: 'very good',
      locationId: 3,
      category: 'family',
      owner: 'jordan',
      image: 'image'
    });
    await db.accomodationtype.create({
      id: 1,
      name: ''
    });
    await db.usermanagement.create({
      userId: user.id,
      managerId: user.id
    });
    await db.trips.create({
      originId: 1,
      destinationId: 2,
      lineManagerId: user.id
    });
  });

  it('should create trip when data are valid', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token2}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not create a trip when account is not verified', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });


  it('should create return trip when data are valid', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should not create two trip with the same departure date', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token2}`)
      .send(Sametrip)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not create a trip when origin is not supported by bareboot', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token2}`)
      .send(originFalse)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not create a trip when destination is not supported by bareboot', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token2}`)
      .send(destinationFalse)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
});
