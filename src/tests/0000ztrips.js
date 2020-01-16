import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../app';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import tripsData from './user/tripsData';
import EncryptPassword from '../helpers/Encryptor';

const { expect } = chai;


dotenv.config();

chai.use(chaiHttp);
chai.should();

let token;
let token2;
const token3 = GenerateToken({ email: 'shemad24@gmail.com', isVerified: true, id: 7 });

const verifyToken = tokens => jwt.verify(tokens, process.env.JWTKEY, (err, data) => data);

let requestTrip = {};
describe('trips tests', () => {
  const { trip, returnTrip } = tripsData;
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
      isVerified: true,
      role: 'manager'
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
    const tripRequest = await db.requesttrip.create({
      userId: user.id,
      managerId: user.id,
      tripId: 'ae989f24-5878-4736-87dd-a12d797e12ff',
      status: 'pending',
    });

    requestTrip = tripRequest;
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
  it('should not create a trip when with the same departure date', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(409);
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
  it('manager should get request made by his/her own direct', (done) => {
    chai.request(app).get('/api/v1/trip/trip-requests')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trips requested by your direct reports');
        done();
      });
  });
  it('manager should get requests on the selected page', (done) => {
    chai.request(app).get('/api/v1/trip/trip-requests?page=1')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trips requested by your direct reports');
        done();
      });
  });
  it('should get error when a page is requesting dont have data', (done) => {
    chai.request(app).get('/api/v1/trip/trip-requests?page=2')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        chai.expect(res.body.error).to.eq('No trip requests on this page');

        done();
      });
  });
  it('should not get request he provides invalid token', (done) => {
    chai.request(app).get('/api/v1/trip/trip-requests?=1')
      .set('token', `Bearer ${token3}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        chai.expect(res.body.error).to.eq('You provided the invalid token!');
        done();
      });
  });


  it('should accept the trip request if status is accepted', (done) => {
    const status = 'approved';
    const decoded = verifyToken(token2);
    chai.request(app).patch(`/api/v1/trip-requests/${1}`)
      .set('token', `Bearer ${token2}`)
      .send({ status })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.have.property('userId');
        expect(res.body.data.userId).eql(requestTrip.userId);
        res.body.data.should.have.property('tripId');
        expect(res.body.data.tripId).eql(requestTrip.tripId);
        res.body.data.should.have.property('managerId');
        expect(res.body.data.managerId).eql(decoded.payload.id);
        expect(res.body.data.status).eql('approved');
        done();
      });
  });
  it('should reject the trip request if status is rejected', (done) => {
    const status = 'rejected';
    const decoded = verifyToken(token2);
    chai.request(app).patch(`/api/v1/trip-requests/${1}`)
      .set('token', `Bearer ${token2}`)
      .send({ status })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.have.property('userId');
        expect(res.body.data.userId).eql(requestTrip.userId);
        res.body.data.should.have.property('tripId');
        expect(res.body.data.tripId).eql(requestTrip.tripId);
        res.body.data.should.have.property('managerId');
        expect(res.body.data.managerId).eql(decoded.payload.id);
        expect(res.body.data.status).eql('rejected');
        done();
      });
  });
  it('should return found records from the search query', (done) => {
    chai.request(app).get('/api/v1/trip-requests/search?keyword=she&page=1&limit=1')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return error 404 when no found records from the search query', (done) => {
    const keyword = 'lposd';
    chai.request(app).get(`/api/v1/trip-requests/search?keyword=${keyword}&page=1&limit=1`)
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error');
        expect(res.body.error).eql(`No Records were found for keyword ${keyword}`);
        done();
      });
  });
});
