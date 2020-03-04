import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../app';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import { tripsData, multiCityData, multiCity, notMultiCity } from './user/tripsData';
import EncryptPassword from '../helpers/Encryptor';

const { expect } = chai;


dotenv.config();

chai.use(chaiHttp);
chai.should();

let token;
let token2;
const token3 = GenerateToken({ email: 'shemad24@gmail.com', isVerified: true, id: 7 });

/**
 * @param {String} tokens
 * @returns {Object} JWT
 */
function verifyToken(tokens) {
  return jwt.verify(tokens, process.env.JWTKEY, (_err, data) => data);
}

let requestTrip = {};
describe('trips tests', () => {
  const { trip, returnTrip } = tripsData;

  const { originFalse } = tripsData;
  const { destinationFalse } = tripsData;
  const ApprovedtripId = '40122f00-2547-4550-8589-d7672ae88673';
  const pendingTripId = 'ae989f24-5878-4736-87dd-a12d797e12ff';
  const pendingMulticitytripId = 'ba20e112-bbe8-4bb2-afb8-0f43ec105667';
  const returnTripId = 'e6e057aa-56b8-4622-9fb7-dfeba7762ee5';
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
      locationId: 1,
      category: 'hotel',
      owner: 'jordan',
      image: 'image'
    });
    await db.accomodation.create({
      id: 2,
      name: 'serena',
      description: 'very good',
      locationId: 2,
      category: 'hotel',
      owner: 'jordan',
      image: 'image'
    });
    await db.accomodation.create({
      id: 3,
      name: 'marriot',
      description: 'very good',
      locationId: 3,
      category: 'hotel',
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
      tripId: 'ae989f24-5878-4736-87dd-a12d797e12ff',
      tripType: 'one way',
      userId: user.id,
      createdAt: new Date()
    });
    await db.trips.create({
      id: 34,
      tripId: 'ba20e112-bbe8-4bb2-afb8-0f43ec105667',
      tripType: 'one way',
      originId: 1,
      destinationId: 2,
      userId: user.id,
      createdAt: new Date()
    });
    await db.trips.create({
      id: 35,
      tripId: 'ba20e112-bbe8-4bb2-afb8-0f43ec105667',
      tripType: 'one way',
      originId: 2,
      destinationId: 1,
      userId: user.id,
      createdAt: new Date()
    });
    await db.trips.create({
      id: 36,
      tripId: 'ba20e112-bbe8-4bb2-afb8-0f43ec105667',
      tripType: 'one way',
      originId: 1,
      destinationId: 2,
      userId: user.id,
      createdAt: new Date()
    });
    await db.trips.create({
      tripId: 'ae989f24-5878-4736-87dd-a12d797e12ff',
      tripType: 'one way',
      originId: 1,
      destinationId: 2,
      userId: user.id,
      createdAt: new Date()
    });
    await db.trips.create({
      id: 37,
      tripId: 'e6e057aa-56b8-4622-9fb7-dfeba7762ee5',
      tripType: 'one way',
      originId: 1,
      destinationId: 2,
      userId: user.id,
      createdAt: new Date()
    });

    const tripRequest = await db.requesttrip.create({
      userId: user.id,
      managerId: user.id,
      tripId: 'ae989f24-5878-4736-87dd-a12d797e12ff',
      status: 'pending',
    });
    await db.requesttrip.create({
      userId: user.id,
      managerId: user.id,
      tripId: '40122f00-2547-4550-8589-d7672ae88673',
      status: 'approved',
    });
    await db.requesttrip.create({
      userId: user.id,
      managerId: user.id,
      tripId: 'ba20e112-bbe8-4bb2-afb8-0f43ec105667',
      status: 'pending',
    });
    await db.requesttrip.create({
      userId: user.id,
      managerId: user.id,
      tripId: 'e6e057aa-56b8-4622-9fb7-dfeba7762ee5',
      status: 'pending',
    });
    requestTrip = tripRequest;
  });
  it('should not create a trip when account is not verified', (done) => {
    chai.request(app).post('/api/v1/trips')
      .set('token', `Bearer ${token}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });
  it('should create return trip when data are valid', (done) => {
    chai.request(app).post('/api/v1/trips')
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('should not create a trip when with the same departure date', (done) => {
    chai.request(app).post('/api/v1/trips')
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not create a trip when origin is not supported by bareboot', (done) => {
    chai.request(app).post('/api/v1/trips')
      .set('token', `Bearer ${token2}`)
      .send(originFalse)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not create a trip when destination is not supported by bareboot', (done) => {
    chai.request(app).post('/api/v1/trips')
      .set('token', `Bearer ${token2}`)
      .send(destinationFalse)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('manager should get request made by his/her own direct', (done) => {
    chai.request(app).get('/api/v1/trip-requests')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trips requested by your direct reports');
        done();
      });
  });
  it('manager should get requests on the selected page', (done) => {
    chai.request(app).get('/api/v1/trip-requests?page=1')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trips requested by your direct reports');
        done();
      });
  });
  it('should not get request he provides invalid token', (done) => {
    chai.request(app).get('/api/v1/trip-requests?=1')
      .set('token', `Bearer ${token3}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
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
  it('should not update trip when trip request status is accepted', (done) => {
    chai.request(app).patch(`/api/v1/trips/${ApprovedtripId}`)
      .set('token', `Bearer ${token2}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        chai.expect(res.body.error).to.eq('trip request is closed,you can not edit it. ');
        done();
      });
  });
  it('should update trip when one way trip request status is pending or rejected', (done) => {
    chai.request(app).patch(`/api/v1/trips/${pendingTripId}`)
      .set('token', `Bearer ${token2}`)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trip request was updated successfully');
        done();
      });
  });
  it('should update round trip when  trip request status is pending or rejected', (done) => {
    chai.request(app).patch(`/api/v1/trips/${returnTripId}`)
      .set('token', `Bearer ${token2}`)
      .send(returnTrip)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trip request was updated successfully');
        done();
      });
  });
  it('should update multi city trip when trip request status is pending or rejected', (done) => {
    chai.request(app).patch(`/api/v1/trips/${pendingMulticitytripId}`)
      .set('token', `Bearer ${token2}`)
      .send(multiCityData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trip request was updated successfully');
        done();
      });
  });
  it('should update multi city trip when trip request status is pending or rejected', (done) => {
    chai.request(app).patch(`/api/v1/trips/${pendingMulticitytripId}`)
      .set('token', `Bearer ${token2}`)
      .send(multiCity)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Trip request was updated successfully');
        done();
      });
  });
  it('should not update multi city trip when a user sends an array with object less than two', (done) => {
    chai.request(app).patch(`/api/v1/trips/${pendingMulticitytripId}`)
      .set('token', `Bearer ${token2}`)
      .send(notMultiCity)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        chai.expect(res.body.error).to.eq('Multi city can not go below two cities kindly use one way or round trip');
        done();
      });
  });
  it('should return the number of trips created by a user', (done) => {
    const startDate = new Date();
    chai.request(app).get(`/api/v1/trip-statistics?startDate=${startDate}`)
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        const { details, totalTrips } = res.body.data;
        const [typeOne, typeTwo, typeThree] = details;
        const totalNumber = details.reduce((sum, trips) => sum + parseInt(trips.count, 10), 0);
        res.body.data.should.have.property('totalTrips');
        res.body.data.should.have.property('details');
        expect(details).to.be.an('array');
        expect(totalTrips).eql(totalNumber);
        expect(details).to.include.deep.members([typeOne, typeTwo, typeThree]);
        res.should.have.status(200);
        done();
      });
  });
});
