import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';


import EncryptPassword from '../helpers/Encryptor';

const { expect } = chai;
dotenv.config();

chai.use(chaiHttp);
chai.should();

let token;
let token2;
let users = [];
let accommodation = [];
const rate = { rate: 3 };
const updareRate = { rate: 5 };
describe('Accommodation tests', () => {
  before(async () => {
    await db.accommodationLikesAndUnlikes.destroy({ where: {}, force: true });
    await db.user.destroy({ where: {}, force: true });
    await db.booking.destroy({ where: {}, force: true });
    await db.accomodation.destroy({ where: {}, force: true });
    await db.locations.destroy({ where: {}, force: true });
    await db.accomodationtype.destroy({ where: {}, force: true });
    await db.rooms.destroy({ where: {}, force: true });
    const user = await db.user.create({
      id: 140,
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
      id: 100,
      city: 'Nairobi'
    });
    await db.locations.create({
      id: 200,
      city: 'Kampala'
    });
    await db.accomodation.create({
      id: 100,
      name: 'marriot',
      description: 'very good',
      locationId: 100,
      category: 'hotel',
      owner: 'jordan',
      image: 'image'
    });
    const accommodation1 = await db.accomodation.create({
      id: 200,
      name: 'serena',
      description: 'very good',
      locationId: 200,
      category: 'hotel',
      owner: 'jordan',
      image: 'image'
    });
    await db.accomodationtype.create({
      id: 100,
      name: ''
    });
    await db.accomodationRates.create({
      userid: usera.id,
      accommodationId: 200,
      rate: 4
    });
    await db.usermanagement.create({
      userId: user.id,
      managerId: user.id
    });
    await db.rooms.create({
      id: 100,
      accomodationId: 200,
      typeId: 100,
      locationId: 200
    });
    await db.booking.create({
      id: 100,
      userid: user.id,
      accommodationid: 200,
      roomid: 100

    });
    accommodation = accommodation1;
    users = user;
  });

  it('should rate accommodation that is booked', (done) => {
    chai.request(app).post('/api/v1/accommodations/200/ratings')
      .set('token', `Bearer ${token2}`)
      .send(rate)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('You rated this accomodation successfully');
        res.body.data.should.have.property('userId');
        expect(res.body.data.userId).eql(users.id);
        res.body.data.should.have.property('accommodationId');
        expect(res.body.data.accommodationId).eql(accommodation.id);
        res.body.data.should.have.property('rate');
        expect(res.body.data.rate).eql(rate.rate);
        done();
      });
  });
  it('should get average rate on a certain accommodation', (done) => {
    chai.request(app).get('/api/v1/accommodations/200/average-ratings')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('The average rate of this accommodation');
        res.body.data.should.have.property('average');
        expect(res.body.data.average).eql(3.5);
        done();
      });
  });
  it('should get average rate on a certain accommodation', (done) => {
    chai.request(app).get('/api/v1/accommodations/100/average-ratings')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('The average rate of this accommodation');
        res.body.data.should.have.property('average');
        expect(res.body.data.average).eql(0);
        done();
      });
  });
  it('should update acommodation rate', (done) => {
    chai.request(app).patch('/api/v1/accommodations/200/ratings')
      .set('token', `Bearer ${token2}`)
      .send(updareRate)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        chai.expect(res.body.message).to.eq('Rate was updated successfully');
        res.body.data.should.have.property('rate');
        expect(res.body.data.rate).eql(updareRate.rate);
        done();
      });
  });
  it('should get error when the user who is performing an action is not admin or travel admin ', (done) => {
    chai.request(app).get('/api/v1/accommodations')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        chai.expect(res.body.error).to.eq('You can not perform this Action');
        done();
      });
  });
});
