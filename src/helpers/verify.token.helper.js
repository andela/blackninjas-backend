import jwt from 'jsonwebtoken';
import response from './response.helper';
import UserServices from '../services/user.service';

const verifyAllTokens = async (req, res, next, token) => {
  if (!token) {
    return response.errorMessage(res, 'No token provided, Access Denied!', 401);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    const user = await UserServices.findUser({ email: decodedToken.email });
    decodedToken.token = token;
    if (user.token !== token && user.token === null) {
      return response.successMessage(res, 'You need to signin first!', 401);
    }
    req.user = decodedToken;
    return next();
  } catch (error) {
    return response.errorMessage(res, 'You provided the invalid token!', 401);
  }
};

export default verifyAllTokens;
