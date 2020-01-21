import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

use(chaiHttp);
let token2;
let token1;
describe('/trip/myrequests', () => {
  before(async () => {
    const user = await db.user.create({
      id: 490,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'bnit300@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: true
    });
    token2 = GenerateToken({
      email: 'bnit300@gmail.com', firstName: 'jaja', isVerified: true, id: user.id
    });
    await user.update({ token: token2 });
    const usera = await db.user.create({
      id: 500,
      firstName: 'benit',
      lastName: 'havuga',
      email: 'bnit3000@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('0788787273'),
      isVerified: false
    });
    token1 = GenerateToken({
      email: 'bnit3000@gmail.com', firstName: 'jaja', isVerified: false, id: usera.id
    });
    await usera.update({ token: token1 });
    await db.locations.create({
      id: 5,
      city: 'Nairobi'
    });
    await db.locations.create({
      id: 6,
      city: 'Kampala'
    });
    await db.locations.create({
      id: 7,
      city: 'Goma'
    });
    await db.accomodation.create({
      id: 4,
      name: 'marriot',
      description: 'very good',
      locationId: 3,
      category: 'family',
      owner: 'jordan',
      image: 'image'
    });
    await db.accomodationtype.create({
      id: 10,
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
    await db.requesttrip.create({
      id: 30,
      userId: user.id,
      managerId: user.id,
      tripId: '',
      status: 'pending'

    });
  });
  it('should check if a user is available and then return requests', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/my-trip-requests?page=1')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('My Trip Requests');
        done();
      });
  });
  it('should check if a page is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/my-trip-requests?page=jaja')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('My Trip Requests');
        done();
      });
  });
  it('should check if page is less than one', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/my-trip-requests?page=2')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        chai.expect(res.body.error).to.eq('No Trip Request Found');
        done();
      });
  });
  it('should check if a user is not verified and then give him message to verify first', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips/my-trip-requests?page=2')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('Account not verified');
        done();
      });
  });
});
