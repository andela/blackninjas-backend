import jwt from 'jsonwebtoken';

const Helper = {
  GenerateToken(email, password, isVerified) {
    const token = jwt.sign({
      email,
      password,
      isVerified

    }, process.env.JWTKEY, { expiresIn: '1d' });


    return token;
  }


};
export default Helper;
