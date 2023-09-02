export interface Users {
  [x: string]: string;
  userId: string;
  password: string;
  userMail: string;
  userName: string;
}

export const userInt: Users = {
  userId: '',
  password: '',
  userMail: '',
  userName: '',
};