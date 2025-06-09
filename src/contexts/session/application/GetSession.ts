import { Session, SessionRepository } from "../domain";

export class GetSession {
  constructor(private readonly repository: SessionRepository) {}
  public async execute(): Promise<Session | null> {
    return await this.repository.getSession();
  }
}
