export class Auth {
  id: number;
  email: string;
  username: string;
  password: string;
  roles: string[];
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    email: string,
    username: string,
    password: string,
    roles: string[],
    isEmailVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.isEmailVerified = isEmailVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
