import GenerateToken from './token.helper';
import userService from '../services/user.service';

const managerToken = async (managerId) => {
  const managerInfo = await userService.findUser({ id: managerId });
  delete managerInfo.dataValues.password; delete managerInfo.dataValues.token;
  const Token = GenerateToken(managerInfo.dataValues);
  return Token;
};
export default managerToken;
