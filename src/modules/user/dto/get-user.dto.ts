export class GetUserDto {
  id: number;
  email: string;
  username: string;
  roles: string[];
  isEmailVerified: boolean;
}

export class GetUserWithTokenDto extends GetUserDto {
  accessToken: string;
}
