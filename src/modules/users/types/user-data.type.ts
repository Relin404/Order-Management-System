export type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  refreshToken?: string;
  joinedAt: Date;
  updatedAt: Date;
};
