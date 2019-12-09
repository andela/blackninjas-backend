import chaiHttp from 'chai-http';
import { use, request, expect } from 'chai';
import app from '../app';
import db from '../database/models';
import EncryptPassword from '../helpers/Encryptor';

use(chaiHttp);
const signPath = '/api/v1/auth/signin';
describe('/auth/signin', () => {
  before(async () => {
    await db.user.destroy({ where: {}, force: true });
    await db.user.create({
      firstName: 'benit',
      lastName: 'havuga',
      password: EncryptPassword('0788787273'),
      isVerified: true,
      email: 'benit300@gmail.com'
    });
    await db.user.create({
      firstName: 'benit',
      lastName: 'havuga',
      password: EncryptPassword('0788787273'),
      email: 'benit3000@gmail.com'
    });
  });
  it('should not login unregistered user', async () => {
    const res = await request(app)
      .post(signPath)
      .send({
        email: 'unregistered@unregistered.com',
        password: 'unregistered',
      });
    expect(res.status).eql(400);
  });
  it('should not login valid user with wrong password', async () => {
    const res = await request(app)
      .post(signPath)
      .send({
        email: 'benit300@gmail.com',
        password: 'wrong_password',
      });
    expect(res.status).eql(422);
  });
  it('should not login user with invalid email', async () => {
    const res = await request(app)
      .post(signPath)
      .send({
        email: 'john@mccaincom',
        password: '12345678'
      });
    expect(res.status).eql(422);
  });
  it('It should not login user without verifying', async () => {
    const res = await request(app)
      .post(signPath)
      .send({
        email: 'benit3000@gmail.com',
        password: '0788787273',
      });
    expect(res.status).eql(401);
  });
  it('It should not login user with unvalid password', async () => {
    const res = await request(app)
      .post(signPath)
      .send({
        email: 'benit300@gmail.com',
        password: '07887872730',
      });
    expect(res.status).eql(400);
  });
  it('should login registered user with valid credentials', async () => {
    const res = await request(app)
      .post(signPath)
      .send({
        email: 'benit300@gmail.com',
        password: '0788787273',
      });
    expect(res.status).eql(200);
  });
});
