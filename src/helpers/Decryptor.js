import bcrypt from 'bcrypt';

const comparePassword = (plainPwd, hashedPwd) => bcrypt.compareSync(plainPwd, hashedPwd);

export default comparePassword;
