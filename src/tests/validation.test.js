import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
describe('App Tests', () => {
  it('user should receive descriptive signup/Registration validation errors', (done) => {
    chai.request(app).post('/api/v1/signup')
      .send({})
      .end((err, res) => {
        chai.expect(res.status).to.eq(422);
        chai.expect(res.body.length).to.eq(8);
        chai.expect(res.body[0]).to.eq([
          'Provided first name is not valid.',
          'Provided last name is not valid.',
          'Invalid email address, example: example@gmail.com.',
          'Invalid password, your password should be alphanumeric with atleast 8 charactors.',
          'Invalid password, your password should be alphanumeric with atleast 8 charactors.',
          'Provided country is not valid.',
          'Provided gender is not valid.',
          'Provided birthday is not valid.'
        ][0]);
        done();
      });
  });
});
