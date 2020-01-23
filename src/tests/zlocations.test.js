import chai from 'chai';
import chaiHttp from 'chai-http';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import EncryptPassword from '../helpers/Encryptor';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const token = GenerateToken({ email: 'nsengimanavedadom@gmail.com', isVerified: 'true', id: 1 });

describe('Locations Tests', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.locations.destroy({ where: {}, force: true });
    await db.trips.destroy({ where: {}, force: true });
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
      id: 12,
      city: 'Nairobi',
      country: 'Kenya'
    });
    await db.locations.create({
      id: 13,
      city: 'Kampala',
      country: 'Uganda'
    });
    await db.trips.create({
      id: 33,
      originId: 12,
      destinationId: 13,
      tripId: 'ae989f24-5878-4736-87dd-a12d797e12ff',
      userId: 198
    });
  });
  it('should return most travelled destination', (done) => {
    chai.request(app)
      .get('/api/v1/locations/most-travelled')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).eql('Most traveled locations');
        chai.expect(res.body.data[0].country).eql('Uganda');
        chai.expect(res.body.data[0].city).eql('Kampala');
        done();
      });
  });
});
