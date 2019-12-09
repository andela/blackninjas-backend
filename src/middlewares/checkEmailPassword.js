import response from '../helpers/responseHandler';
import UserServices from '../services/UserService';
import comparePassword from '../helpers/Decryptor';
import Token from '../helpers/token';

const checkEmailpassword = async (req, res) => {
  const user = await UserServices.findUserByEmail(req.body.email);
  if (user == null) {
    const status = 400;
    return response.errorMessage(req, res, 'Email not found', status);
  }
  if (!comparePassword(req.body.password, user.password)) {
    const status = 400;
    return response.errorMessage(req, res, 'Email and password not match', status);
  }
  const isverifiedTrue = user.isVerified;
  if (!isverifiedTrue) {
    const status = 401;
    return response.errorMessage(req, res, 'User Is Not Verified', status);
  }

  const token = Token.GenerateToken(req.body.email, req.body.password, user.isVerified);
  return response.successMessage(
    req,
    res,
    'user LoggedIn succefully',
    200,
    token
  );
};
export default checkEmailpassword;
