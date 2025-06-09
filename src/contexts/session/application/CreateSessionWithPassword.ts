import { Session, SessionRepository } from "../domain";

export class CreateSessionWithPassword {
  constructor(private readonly repository: SessionRepository) {}
  public async execute(email: string, password: string): Promise<Session> {
    const session = await this.repository.signInWithPassword(email, password);

    return session;
  }
}
