import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import userController from '../controllers/user.controller';
import profile from './mock/socialMock';
import db from '../services/user.service';

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
const { expect } = chai;

describe('Social authentication tests', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should return user data when it get the profile from the social account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const callBack = sinon.spy();
    await userController.googleAndFacebookPlusAuth(accessToken, refreshToken, profile, callBack);
    expect(callBack.withArgs(null, profile));
  });

  it('should return catch error when there is an error', async () => {
    const accessToken = 't';
    const refreshToken = 't';
    const callBack = sinon.spy();
    db.findOrCreateUser = sinon.stub(new Error());
    await userController.googleAndFacebookPlusAuth(accessToken, refreshToken, profile, callBack);
    expect(callBack.withArgs(false));
  });
});
