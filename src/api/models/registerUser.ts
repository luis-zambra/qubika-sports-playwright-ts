export interface RegisterUserRequest {
    email: string;
    password: string;
    roles: string[];
}

export interface RegisterUserResponse {
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    password: string;
    roles: string[];
    userName: string;
}
  