import axios from 'axios';
import { API_URLS } from './urls';
import { RegisterUserRequest, RegisterUserResponse } from './models/registerUser';

export const registerUser = async (
  userData: RegisterUserRequest
 ): Promise<{ status: number; data?: RegisterUserResponse; error?: string }> => {
  try {
    const response = await axios.post<RegisterUserResponse>(
      API_URLS.registerUser, 
      userData
    );
    return { status: response.status, data: response.data };
  } catch(error: any) {
    return {
      status: error.response?.status || 500,
      error: error.response?.data?.message || error.message || 'Unknown error',
    };
  }
};