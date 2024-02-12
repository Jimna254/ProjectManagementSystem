export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  areaofspecialization: string;
}

export interface loginUserDetails {
  user_id: string;
  name: string;
  email: string;
  role: string;
  areaofspecialization: string;
  isWelcomed: boolean;
}
