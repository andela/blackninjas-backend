import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../database/models';
import GenerateToken from '../helpers/token.helper';
import EncryptPassword from '../helpers/Encryptor';

chai.use(chaiHttp);

const token = GenerateToken({ email: 'nsengimanavedadom90@gmail.com', isVerified: true, id: 1 });
const token2 = GenerateToken({ email: 'nsengimanavedadom32@gmail.com', isVerified: true, id: 3 });
const token1 = GenerateToken({ email: 'shemhdsnbad@gmail.com', isVerified: false, id: 2 });
const data = {
  accommodationName: 'coller',
  description: 'benit',
  locationId: 120,
  owner: 'kaba',
  category: 'family',
  images: [{
    imageUrl: 'imag1'
  }, {
    imageUrl: 'image2'
  }, {
    imageUrl: 'image3'
  }],
  rooms: [{
    numberOfRoom: 10,
    typeId: 100,
    price: 200,
    currency: 'dollar',
    roomImageUrl: 'roomImage1'
  }, {
    numberOfRoom: 11,
    typeId: 200,
    price: 200,
    currency: 'euro',
    roomImageUrl: 'roomImage2'
  }
  ],
  services: [{
    serviceName: 'Restaurant'
  }, {
    serviceName: 'Club'
  }, {
    serviceName: 'Pool'
  }],
  amenities: [{
    amenityName: 'Morning breakfast'
  }, {
    amenityName: 'parking'
  }]
};
describe('Accommodation Tests', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.accomodation.destroy({ where: {}, force: true });
    await db.user.create({
      firstName: 'Veda',
      lastName: 'Dominique',
      email: 'nsengimanavedadom90@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1994',
      password: EncryptPassword('vedadom'),
      phoneNumber: '0785571790',
      isVerified: true,
      role: 'travel-administrator',
      token,
      emailNotification: true,
      appNotification: true
    });
    await db.user.create({
      firstName: 'shema2',
      lastName: 'eric2',
      email: 'shemhdsnbad@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: false,
      role: 'trip-administration',
      token: token1,
      emailNotification: true,
      appNotification: true
    });
    await db.user.create({
      firstName: 'Veda',
      lastName: 'Dominique',
      email: 'nsengimanavedadom32@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1994',
      password: EncryptPassword('vedadom'),
      phoneNumber: '0785571790',
      isVerified: true,
      role: 'requester',
      token: token2,
      emailNotification: true,
      appNotification: true
    });
    await db.locations.create({
      id: 120,
      city: 'rusaka'
    });
  });
  it('should check if user is logged in as trip administrator or Supplier and then create new accomodation', (done) => {
    chai
      .request(app).post('/api/v1/accommodations')
      .set('token', `Bearer ${token}`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.message).eql('accommodation is successfully created');
        done();
      });
  });
  it('should check if user is authorized to create an accommodation', (done) => {
    chai
      .request(app).post('/api/v1/accommodations')
      .set('token', `Bearer ${token2}`)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.error).to.eq('You are not authorized to perform this action');
        done();
      });
  });
  it('should check get a specific accommodation details', (done) => {
    chai
      .request(app).get('/api/v1/accommodations/1')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.message).to.eq('accommodation data');
        done();
      });
  });
});
