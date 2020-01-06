import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import GenToken from '../helpers/token.helper';
import db from '../database/models';
import tripsData from './user/tripsData';
import EncryptPassword from '../helpers/Encryptor';


chai.use(chaiHttp);
chai.should();
const token = GenToken.GenerateToken('shema@gmail.com', 'shema', false, 1);
const token2 = GenToken.GenerateToken('shema@gmail.com', 'shema', true, 6);
describe('trips tests', () => {
  const { trip, returnTrip } = tripsData;
  const { Sametrip } = tripsData;
  const { originFalse } = tripsData;
  const { destinationFalse } = tripsData;
  before(async () => {
    await db.locations.create({
      city: 'Nairobi'
    });
    await db.locations.create({
      city: 'Kampala'
    });
    await db.locations.create({
      city: 'Goma'
    });
    await db.user.create({
      id: 6,
      firstName: 'shema',
      lastName: 'eric',
      email: 'shema@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: true
    });
    await db.accomodation.create({
      id: 1,
      name: 'marriot',
      description: 'very good',
      locationId: 1,
      category: 'family',
      owner: 'jordan',
      image: 'image'
    });
    await db.accomodationtype.create({
      id: 1,
      name: ''
    });
    await db.rooms.create({
      id: 1,
      name: 'muhabura',
      accomodationId: 1,
      typeId: 1,
      status: 'available',
      price: 300000
    });
    await db.usermanagement.create({
      userId: 6,
      managerId: 6
    });
    await db.trips.create({
      originId: 1,
      destinationId: 2,
      lineManagerId: 6
    });
  });

  it('trip created successfully', (done) => {
    chai.request(app).post('/api/v1/trips/oneway')
      .set('token', `Bearer ${token2}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('when account is not verified', (done) => {
    chai.request(app).post('/api/v1/trips/oneway')
      .set('token', `Bearer ${token}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });


  it('should create return trip', (done) => {
    chai.request(app).post('/api/v1/trips/return_trip')
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('you can not book that trip', (done) => {
    chai.request(app).post('/api/v1/trips/oneway')
      .set('token', `Bearer ${token2}`)
      .send(Sametrip)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not create return trip when already booked', (done) => {
    chai.request(app).post('/api/v1/trips/return_trip')
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
  it('when origin dont exist', (done) => {
    chai.request(app).post('/api/v1/trips/oneway')
      .set('token', `Bearer ${token2}`)
      .send(originFalse)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('when destination dont exist', (done) => {
    chai.request(app).post('/api/v1/trips/oneway')
      .set('token', `Bearer ${token2}`)
      .send(destinationFalse)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('when account is not verified', (done) => {
    chai.request(app).post('/api/v1/trips/oneway')
      .set('token', `Bearer ${token}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });
});
