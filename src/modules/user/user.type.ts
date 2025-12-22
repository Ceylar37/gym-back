export interface UpdateUserTokenDto {
  id: string;
  email: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RemoveRefreshTokenDto {
  id: string;
  refreshToken: string;
}
