import jwt from 'jsonwebtoken';

const Helper = {
  GenerateToken(email, isVerified, id) {
    const token = jwt.sign({
      email,
      isVerified,
      id

    }, process.env.JWTKEY, { expiresIn: '1d' });


    return token;
  }


};
export default Helper;
