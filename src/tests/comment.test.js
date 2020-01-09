import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import {
  roomDatabaseData,
  accomodationDatabaseData,
  locationDatabaseData,
  UserDatabaseData,
  userManagementDatabaseData,
  accomodationTypeDatabaseData,
  comment, trip, requestTrip
} from './mock/comment.mock.data';

chai.use(chaiHttp);
chai.should();

const token = GenerateToken({ email: 'user@gmail.com', isVerified: 'true' });
const anauthorizedToken = GenerateToken({ email: 'unauthorized@gmail.com', isVerified: 'true' });


describe('comment tests', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.user.create(UserDatabaseData[0]);
    await db.user.create(UserDatabaseData[1]);
    await db.user.create(UserDatabaseData[2]);
    await db.locations.create(locationDatabaseData[0]);
    await db.locations.create(locationDatabaseData[1]);
    await db.locations.create(locationDatabaseData[2]);
    await db.locations.create(locationDatabaseData[3]);
    await db.accomodationtype.create(accomodationTypeDatabaseData[0]);
    await db.accomodationtype.create(accomodationTypeDatabaseData[1]);
    await db.accomodationtype.create(accomodationTypeDatabaseData[2]);
    await db.accomodation.create(accomodationDatabaseData[0]);
    await db.accomodation.create(accomodationDatabaseData[1]);
    await db.accomodation.create(accomodationDatabaseData[2]);
    await db.accomodation.create(accomodationDatabaseData[3]);
    await db.rooms.create(roomDatabaseData[0]);
    await db.rooms.create(roomDatabaseData[1]);
    await db.rooms.create(roomDatabaseData[2]);
    await db.rooms.create(roomDatabaseData[3]);
    await db.usermanagement.create(userManagementDatabaseData[0]);
    await db.trips.create(trip[0]);
    await db.trips.create(trip[1]);
    await db.requesttrip.create(requestTrip[0]);
    await db.requesttrip.create(requestTrip[1]);
    await db.comment.create(comment);
  });

  it('comment should be created successfuly', (done) => {
    chai
      .request(app)
      .post(`/api/v1/trip-request/comment/${trip[0].tripId}`)
      .set('token', `Bearer ${token}`)
      .send({ comment: 'new comment' })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('it should check if a comment exist', (done) => {
    chai
      .request(app)
      .post(`/api/v1/trip-request/comment/${trip[0].tripId}`)
      .set('token', `Bearer ${token}`)
      .send({ comment: 'new comment' })
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('it should check if a trip request has a comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-request/comment/${trip[1].tripId}/view/?page=1&limit=2`)
      .set('token', `Bearer ${anauthorizedToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should check get all trip request comments', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-request/comment/${trip[0].tripId}/view/?page=1&limit=1`)
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should check if limit has a string', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-request/comment/${trip[0].tripId}/view/?page=1&limit=gh`)
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('it should check if a trip exist', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip-request/comment/invalidTripId/view/?page=1&limit=1')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should check if a user allowed to view others comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-request/comment/${trip[0].tripId}/view/?page=1&limit=2`)
      .set('token', `Bearer ${anauthorizedToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
