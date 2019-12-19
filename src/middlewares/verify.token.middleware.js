import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import GeneToken from '../helpers/token';
import logger from '../helpers/logger.helper';

dotenv.config();
const newtoken = GeneToken.GenerateToken('Andreane_Schmitt@gmail.com', 'shemaeric', 'false', 'shema');

logger('info', newtoken);

const hasSiggned = (req, res, next) => {
  const token = req.params.autorizations;
  if (Number(token)) {
    return res.status(401).send({
      status: '401',
      error: 'Token must not be a number',
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).send({
      status: '401',
      error: 'You provided the invalid token!',
    });
  }
};
export default hasSiggned;
