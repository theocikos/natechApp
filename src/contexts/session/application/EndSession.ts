import { SessionRepository } from "../domain";

export class EndSession {
  constructor(private readonly repository: SessionRepository) {}
  public async execute(): Promise<void> {
    await this.repository.logout();
  }
}
