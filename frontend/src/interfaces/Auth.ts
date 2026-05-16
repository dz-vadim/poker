export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  roles: object[];
  wallet: object;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: any) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => void;
}