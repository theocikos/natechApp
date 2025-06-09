export type SessionPrimitives = {
  id: string;
  accessToken: string;
  userSnippet: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    balance: number;
  };
};
