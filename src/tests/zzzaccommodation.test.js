import chai from 'chai';
import chaiHttp from 'chai-http';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import EncryptPassword from '../helpers/Encryptor';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const token = GenerateToken({ email: 'nsengimanavedadom@gmail.com', isVerified: 'true', id: 1 });

describe('Book accommodation Tests', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.accomodationtype.destroy({ where: {}, force: true });
    await db.locations.destroy({ where: {}, force: true });
    await db.user.create({
      id: 198,
      firstName: 'Veda',
      lastName: 'Dominique',
      email: 'nsengimanavedadom@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1994',
      password: EncryptPassword('vedadom'),
      phoneNumber: '0785571790',
      isVerified: true,
      token,
      emailNotification: true,
      appNotification: true
    });

    await db.locations.create({
      id: 87,
      city: 'Nairobi'
    });

    await db.accomodation.create({
      id: 142,
      name: 'Marriot',
      description: 'very good',
      locationId: 87,
      category: 'family',
      owner: 'jordan',
      numberOfRooms: 6,
      availableRooms: 6
    });
    await db.accomodation.create({
      id: 143,
      name: 'Marriot',
      description: 'very good',
      locationId: 87,
      category: 'family',
      owner: 'jordan',
      numberOfRooms: 6,
      availableRooms: 0
    });
    await db.accomodationtype.create({
      id: 1,
      name: 'Clasic room'
    });
    await db.rooms.create({
      accomodationId: 142,
      typeId: 1,
      price: 200,
      currency: 'dollar',
      roomImageUrl: 'roomImage1'
    });
  });
  it('should book an accommodation facility', (done) => {
    chai.request(app).post('/api/v1/accommodations/booking')
      .set('token', `Bearer ${token}`)
      .send({
        accommodationId: 142,
        roomTypeId: 1,
        departureDate: '2020-04-04',
        checkoutDate: '2020-04-12'
      })
      .end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.message).eql('Booking was successfully processed');
        chai.expect(res.body.data.departuredate.toString()).eql('2020-04-04T00:00:00.000Z');
        chai.expect(res.body.data.checkoutdate.toString()).eql('2020-04-12T00:00:00.000Z');
        done();
      });
  });
  it('should not book an accommodation facility if no rooms available', (done) => {
    chai.request(app).post('/api/v1/accommodations/booking')
      .set('token', `Bearer ${token}`)
      .send({
        accommodationId: 143,
        roomTypeId: 8,
        departureDate: '2020-04-04',
        checkoutDate: '2020-04-12'
      })
      .end((err, res) => {
        res.should.have.status(404);
        chai.expect(res.body.message).eql('There\'s no rooms available for accommodation facility provided.');
        done();
      });
  });
});
