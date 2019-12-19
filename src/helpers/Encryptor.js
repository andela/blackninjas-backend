import bcrypt from 'bcrypt';

const EncryptPassword = (password) => {
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds);
};

export default EncryptPassword;
