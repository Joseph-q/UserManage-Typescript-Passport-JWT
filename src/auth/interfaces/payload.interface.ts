import { type UserRole } from '@/src/user/entities/user.entity';

export interface UserPayload {
  role: UserRole | null;
  username: string;
  id: string;
}
