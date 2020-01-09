import UserServices from '../services/user.service';
import response from '../helpers/response.helper';

const isEmailUsed = async (req, res, next) => {
  const user = await UserServices.findUserByEmail(req.body.email);

  if (user) {
    return response.errorMessage(res, 'Provided email is already registered', 409);
  }
  return next();
};
export default isEmailUsed;
