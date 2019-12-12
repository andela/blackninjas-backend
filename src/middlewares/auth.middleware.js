import UserServices from '../services/user.service';

const isEmailUsed = async (req, res, next) => {
  const user = await UserServices.findUserByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      message: 'Provided email is already registered'
    });
  }
  return next();
};
export default isEmailUsed;
