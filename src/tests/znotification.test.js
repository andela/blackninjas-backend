import chai from 'chai';
import chaiHttp from 'chai-http';
import io from 'socket.io-client';
import GenerateToken from '../helpers/token.helper';
import db from '../database/models';
import EncryptPassword from '../helpers/Encryptor';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const token = GenerateToken({ email: 'nsengimanavedadom@gmail.com', isVerified: 'true', id: 1 });
const token1 = GenerateToken({ email: 'shemhdsnbad@gmail.com', isVerified: 'true', id: 2 });

describe('Notification Tests', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.notification.destroy({ where: {}, force: true });
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
    await db.user.create({
      id: 298,
      firstName: 'shema2',
      lastName: 'eric2',
      email: 'shemhdsnbad@gmail.com',
      gender: 'male',
      country: 'Rwanda',
      birthdate: '12-04-1996',
      phoneNumber: '0785571790',
      password: EncryptPassword('shemaeric'),
      isVerified: true,
      role: 'manager',
      token: token1,
      emailNotification: true,
      appNotification: true
    });

    await db.locations.create({
      id: 37,
      city: 'Nairobi'
    });
    await db.locations.create({
      id: 43,
      city: 'Kampala'
    });
    await db.locations.create({
      id: 76,
      city: 'Goma'
    });
    await db.accomodation.create({
      id: 132,
      name: 'marriot',
      description: 'very good',
      locationId: 76,
      category: 'family',
      owner: 'jordan',
      image: 'image'
    });
    await db.usermanagement.create({
      id: 120,
      userId: 298,
      managerId: 198
    });
    await db.notification.create({
      receiver: 198,
      requestId: 9,
      title: 'New requests',
      message: 'New request'
    });
    await db.notification.create({
      receiver: 198,
      requestId: 9,
      title: 'New requests',
      message: 'New request'
    });
    await db.notification.create({
      receiver: 198,
      requestId: 9,
      title: 'New requests',
      message: 'New request'
    });
    const socketURL = 'http://localhost:3000';

    const options = {
      transports: ['websocket'],
      'force new connection': true
    };

    const client = io.connect(socketURL, options);
    client.on('connect', () => {
      client.emit('connect_user', 198);
    });
  });
  it('should send notifications when a trip is created', (done) => {
    chai.request(app).post('/api/v1/trip')
      .set('token', `Bearer ${token1}`)
      .send({
        id: 93,
        From: 43,
        To: 76,
        departureDate: '2020-03-05',
        returnDate: '2020-03-08',
        reason: 'festive holidays',
        accomodationId: 132,
        type: 'return trip'
      })
      .end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.message).eql('Trip created successfully');
        done();
      });
  });
  it('should return notifications', (done) => {
    chai.request(app)
      .get('/api/v1/notifications')
      .set('token', `Bearer ${token1}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).eql('shema2\'s notifications');
        done();
      });
  });
  it('should return a specific notification', (done) => {
    chai.request(app)
      .get('/api/v1/notifications/2')
      .set('token', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).eql('A spesific notification');
        done();
      });
  });
  it('should return 200 after updating user preference.', (done) => {
    chai.request(app)
      .patch('/api/v1/notifications/changePreference')
      .set('token', `Bearer ${token1}`)
      .send({ appNotification: true, emailNotification: false })
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).eql('Successfully update user preference.');
        done();
      });
  });
  it('should mark a notification as read', (done) => {
    chai.request(app)
      .patch(`/api/v1/notifications/${2}`)
      .set('token', `Bearer ${token}`)
      .send({ isRead: true })
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).eql('Successfully marked a notification as read.');
        done();
      });
  });
  it('should mark all notifications to read', (done) => {
    chai.request(app)
      .patch('/api/v1/notifications')
      .set('token', `Bearer ${token}`)
      .send({ isRead: true })
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.message).eql('Successfully marked all notifications as read.');
        done();
      });
  });
});
