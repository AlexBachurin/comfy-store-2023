export type User_Context_Type = {
  user: IUser;
  isAuthenticated: boolean;
  signIn: () => void;
  logoutUser: () => void;
};

export interface IUser {
  displayName: string;
  email: string;
  phoneNumber: null;
  photoURL: string;
  providerId: string;
  uid: string;
}
