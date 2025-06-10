import { AsyncStorageService } from "@/contexts/shared/infrastructure";

import { Session, SessionRepository, Transaction } from "../domain";

const MOCK_USER = {
  firstName: "Theodosis",
  lastName: "Koutsias",
  email: "theodosis44@gmail.com",
  phoneNumber: "+1234567890",
  balance: 5000.0,
};

export class FetchSessionRepository implements SessionRepository {
  constructor(private storageService: AsyncStorageService) {}

  async signInWithPassword(email: string, password: string): Promise<Session> {
    // TODO: Replace with a simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === MOCK_USER.email && password === "password") {
      const session = Session.create({
        id: new Date().toISOString(),
        accessToken: new Date().toISOString(),
        userSnippet: {
          id: new Date().toISOString(),
          firstName: MOCK_USER.firstName,
          lastName: MOCK_USER.lastName,
          email: MOCK_USER.email,
          phoneNumber: MOCK_USER.phoneNumber,
          balance: MOCK_USER.balance,
        },
      });

      await this.storageService.setSecureItem(
        "session",
        JSON.stringify(session)
      );
      return session;
    }

    throw new Error("Invalid credentials");
  }

  async logout(sessionId: string): Promise<void> {
    console.log("Logging out session:", sessionId);
    await this.storageService.removeSecureItem("session");
  }

  async getSession(): Promise<Session | null> {
    const sessionData = await this.storageService.getSecureItem("session");
    if (sessionData) {
      const session = JSON.parse(sessionData);
      console.log("Session fetched from storage:", session);
      return Session.create(session);
    }

    console.log("No session found in storage");
    return null;
  }

  async updateSession(transaction: Transaction): Promise<Session | null> {
    // TODO: Replace with a simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sessionData = await this.storageService.getSecureItem("session");

    if (sessionData) {
      const session = JSON.parse(sessionData);
      const updateSession = Session.create({
        ...session,
        userSnippet: {
          ...session.userSnippet,
          balance: session.userSnippet.balance - transaction.amount,
        },
      });

      await this.storageService.setSecureItem(
        "session",
        JSON.stringify(updateSession)
      );
      
      return updateSession;
    }
    return null;
  }
}
