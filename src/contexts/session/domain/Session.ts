import { AggregateRoot } from "@/contexts/shared/domain";
import { SessionPrimitives } from "./SessionPrimitives";

export class Session extends AggregateRoot<SessionPrimitives> {
  private accessToken: string;
  // TODO: If time use a value object for user snippet
  private userSnippet: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    balance: number;
  };

  constructor(primitives: SessionPrimitives) {
    super(primitives.id);
    this.accessToken = primitives.accessToken;
    this.userSnippet = {
      id: primitives.userSnippet.id,
      firstName: primitives.userSnippet.firstName,
      lastName: primitives.userSnippet.lastName,
      email: primitives.userSnippet.email,
      phoneNumber: primitives.userSnippet.phoneNumber,
      balance: primitives.userSnippet.balance,
    };

  }

  static create(primitives: SessionPrimitives): Session {
    return new Session(primitives);
  }
  public getAccessToken(): string {
    return this.accessToken;
  }
  public toPrimitives(): SessionPrimitives {
    return {
      id: this.getId(),
      accessToken: this.getAccessToken(),
        userSnippet: {
            id: this.userSnippet.id,
            firstName: this.userSnippet.firstName,
            lastName: this.userSnippet.lastName,
            email: this.userSnippet.email,
            phoneNumber: this.userSnippet.phoneNumber,
            balance: this.userSnippet.balance,
        },
    };
  }
}
