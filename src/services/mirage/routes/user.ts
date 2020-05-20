import { Response, Request } from 'miragejs';
import { handleErrors } from '../server';
import { User } from '../../../interfaces/user.interface';

const login = (schema: any, req: Request): User | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });
  if (!user) {
    return handleErrors(null, 'No user with that username exists');
  }
  if (password !== user.password) {
    return handleErrors(null, 'Password is incorrect');
  }
  return user.attrs as User;
};

const signup = (schema: any, req: Request): User | Response => {
  const data = JSON.parse(req.requestBody);
  const user = schema.users.create(data);
  return user.attrs as User;
};

export default {
  login,
  signup,
};
