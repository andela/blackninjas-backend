import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../database/models';
import GenToken from '../helpers/token.helper';
import {
  roomDatabaseData,
  accomodationDatabaseData,
  locationDatabaseData,
  UserDatabaseData,
  multiCity,
  userManagementDatabaseData,
  accomodationTypeDatabaseData
} from './mock/trip.mock.data';

chai.use(chaiHttp);
chai.should();

const token = GenToken.GenerateToken('multicity@gmail.com', 'shemaeric', 'true');

describe('user should be able to make multi-city request', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.user.create(UserDatabaseData[0]);
    await db.user.create(UserDatabaseData[1]);
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
  });

  it('it should  check user are making multi-city', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[0])
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should  check if the second trip departure date is not greater than the firtst trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[1])
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
  it('it should  check if accomodation exist at destination', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[2])
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('it should  check if accomodation exist in database', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[3])
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('it should  check if trip exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[0])
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
  it('it should  check the trip pattern', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[4])
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
  it('it should  check if date is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[5])
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('it should  check if origin exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[7])
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('it should  check if destination  exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[11])
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('it should  check if location is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[8])
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('it should  check if accomodation id is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[9])
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('it should  check if date is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip')
      .set('token', `Bearer ${token}`)
      .send(multiCity[10])
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
