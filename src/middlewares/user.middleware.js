import response from '../helpers/response.helper';
import UserServices from '../services/user.service';
import comparePassword from '../helpers/Decryptor';
import Token from '../helpers/token.helper';

const checkEmailpassword = async (req, res) => {
  const user = await UserServices.findUserByEmail(req.body.email);
  if (user == null) {
    const status = 404;
    return response.errorMessage(res, 'User is not found', status);
  }
  if (!comparePassword(req.body.password, user.password)) {
    const status = 404;
    return response.errorMessage(res, 'Email or password does not match', status);
  }
  const isverifiedTrue = user.isVerified;
  if (!isverifiedTrue) {
    const status = 401;
    return response.errorMessage(res, 'User Is Not Verified, Please verify the User First', status);
  }

  const token = Token.GenerateToken(req.body.email, req.body.password, user.isVerified);
  await UserServices.updateUser(req.body.email, { token });
  return response.successMessage(
    res,
    'user succefully loggedin',
    200,
    token
  );
};
export default checkEmailpassword;
