export interface User {
  save(): unknown;
  id?: number;
  username: string;
  email: string;
  password: string;
  image?: string | null;
  isVerified?: boolean;
  subscription?: "free_trial" | "standard" | "premium";
  trial_end_date?: Date;
  verificationToken?: any;
}
