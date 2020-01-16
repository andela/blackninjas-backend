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
const linemanagerToken = GenerateToken({ email: 'linemanager@gmail.com', isVerified: 'true' });


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
    await db.comment.create(comment[0]);
    await db.comment.create(comment[1]);
  });

  it('comment should be created successfuly', (done) => {
    chai
      .request(app)
      .post(`/api/v1/trip-requests/${trip[0].tripId}/comments`)
      .set('token', `Bearer ${token}`)
      .send(comment[2])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.be.a('object');
        res.body.should.have.property('message').eql('comment created successfuly');
        res.body.data.should.have.property('id').eql(1);
        res.body.data.should.have.property('subjectId').eql(trip[0].tripId);
        res.body.data.should.have.property('commentorId').eql(trip[0].userId);
        res.body.data.should.have.property('comment').eql(comment[2].comment);
        res.body.data.should.have.property('updatedAt');
        res.body.data.should.have.property('createdAt');
        done();
      });
  });

  it('should display an error message in case a trip request does not have a comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-requests/${trip[1].tripId}/comments?page=1`)
      .set('token', `Bearer ${anauthorizedToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.be.a('object');
        res.body.should.have.property('error').eql('No comment yet');
        done();
      });
  });

  it('should display all trip request comments', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-requests/${trip[0].tripId}/comments?page=1`)
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.be.a('object');
        res.body.should.have.property('message').eql('success');
        res.body.data.should.have.property('userId').eql(UserDatabaseData[2].id);
        res.body.data.should.have.property('managerId').eql(UserDatabaseData[1].id);
        res.body.data.should.have.property('username').eql(UserDatabaseData[2].firstName);
        res.body.data.should.have.property('managerName').eql(UserDatabaseData[1].firstName);
        res.body.data.should.have.property('date');
        done();
      });
  });

  it('should check if a trip exist', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip-requests/invalidTripId/comments?page=1')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.be.a('object');
        res.body.should.have.property('error').eql('Trip not found');
        done();
      });
  });

  it('should check if a user allowed to view others comment', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trip-requests/${trip[0].tripId}/comments?page=1`)
      .set('token', `Bearer ${anauthorizedToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.be.a('object');
        res.body.should.have.property('error').eql('You are not authorized for this kind of request');
        done();
      });
  });

  it('should display error message in case a comment does not exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/trip-requests/ubjectId/comments/0')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.be.a('object');
        res.body.should.have.property('error').eql('Comment not found');
        done();
      });
  });

  it('should check if a user allowed to delete athers comment', (done) => {
    chai
      .request(app)
      .delete('/api/v1/trip-requests/ubjectId/comments/14')
      .set('token', `Bearer ${linemanagerToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.be.a('object');
        res.body.should.have.property('error').eql('You are not authorized to delete this comment');
        done();
      });
  });

  it('should check if comment id is a number', (done) => {
    chai
      .request(app)
      .delete('/api/v1/trip-requests/ubjectId/comments/invalid')
      .set('token', `Bearer ${linemanagerToken}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.be.a('object');
        res.body.should.have.property('error').eql('Comment id must be a number');
        done();
      });
  });

  it('user should be able to delete a comment', (done) => {
    chai
      .request(app)
      .delete('/api/v1/trip-requests/ubjectId/comments/14')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.be.a('object');
        res.body.should.have.property('message').eql('Comment has been successfuly deleted');
        done();
      });
  });
});
