import jwt from 'jsonwebtoken';

const GenToken = (email, password, isVerified) => {
  const token = jwt.sign(
    {
      email,
      password,
      isVerified
    },
    process.env.JWTKEY,
    { expiresIn: '1d' }
  );

  return token;
};
export default GenToken;
