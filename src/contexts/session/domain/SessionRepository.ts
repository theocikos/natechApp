import { Session } from "./Session";

export type Transaction = {
  amount: number;
  reference: string;
  recipient: string;
  recipientName: string;
};
export interface SessionRepository {
  signInWithPassword(email: string, password: string): Promise<Session>;
  logout(sessionId: string): Promise<void>;
  getSession(): Promise<Session | null>;
  updateSession(transaction: Transaction): Promise<Session | null>;
}
