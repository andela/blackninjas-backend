import jwt from 'jsonwebtoken';

const Helper = {
  GenerateToken(email, isVerified, firstName, id) {
    const token = jwt.sign({
      email,
      isVerified,
      firstName,
      id
    }, process.env.JWTKEY, { expiresIn: '1d' });
    return token;
  }
};
export default Helper;
