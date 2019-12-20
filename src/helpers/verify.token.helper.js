import jwt from 'jsonwebtoken';
import response from './response.helper';

const verifyAllTokens = (req, res, next, token) => {
  if (!token) {
    return response.errorMessage(res, 'No token provided, Access Denied!', 401);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    decodedToken.token = token;
    req.user = decodedToken;
    return next();
  } catch (error) {
    return response.errorMessage(res, 'You provided the invalid token!', 401);
  }
};

export default verifyAllTokens;
