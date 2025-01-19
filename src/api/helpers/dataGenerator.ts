import casual from 'casual';
import { RegisterUserRequest } from '../models/registerUser';

export const generateRegisterUserRequest = (): RegisterUserRequest => {
  return {
    email: casual.email,
    password: casual.password,
    roles: ['ROLE_ADMIN'],
  };
};