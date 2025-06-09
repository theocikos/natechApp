import { Session } from "./Session";

export interface SessionRepository {
  signInWithPassword(email: string, password: string): Promise<Session>;
  logout(sessionId: string): Promise<void>;
}
