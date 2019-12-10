import UserServices from '../services/user.service';

const isEmailUsed = async (req, res, next) => {
  const isEmailExist = await UserServices.isEmailExist(req.body.email);
  if (isEmailExist) {
    return res.status(409).json({
      message: 'Provided email is already registered'
    });
  }
  next();
};

export default isEmailUsed;
