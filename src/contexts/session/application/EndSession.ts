import { SessionRepository } from "../domain";

export class EndSession {
  constructor(private readonly repository: SessionRepository) {}
  public async execute(sessionId: string): Promise<void> {
    await this.repository.logout(sessionId);
  }
}
