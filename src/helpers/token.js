import jwt from 'jsonwebtoken';

const Helper = {
  GenerateToken(email, password, isVerified, firstName) {
    const token = jwt.sign({
      email,
      password,
      isVerified,
      firstName

    }, process.env.JWTKEY, { expiresIn: '1d' });


    return token;
  }


};
export default Helper;
