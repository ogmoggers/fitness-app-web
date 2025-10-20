export interface FirebaseUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}
