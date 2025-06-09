import { AsyncStorageService } from "@/contexts/shared/infrastructure/AsyncStorageService";

import { Session, SessionRepository } from "../domain";

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
      console.log("Session created:", session);
      return session;
    }

    throw new Error("Invalid credentials");
  }

  async logout(): Promise<void> {
    await this.storageService.removeSecureItem("session");
  }
}
