import { Session, SessionRepository, Transaction } from "../domain";

export class UpdateSession {
  constructor(private readonly repository: SessionRepository) {}
  public async execute(transaction: Transaction): Promise<Session | null> {
    return await this.repository.updateSession(transaction);
  }
}
