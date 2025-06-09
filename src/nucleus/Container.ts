import { CreateSessionWithPassword, EndSession, GetSession } from "@/contexts/session/application";
import { FetchSessionRepository } from "@/contexts/session/infrastructure";
import { AsyncStorageService } from "@/contexts/shared/infrastructure";

class NTContainer {
  private static instance: NTContainer;

  // Shared infrastructure
  private storageService: AsyncStorageService;

  // Session
  private sessionRepository: FetchSessionRepository;
  private _createSessionWithPassword: CreateSessionWithPassword;
  private _endSession: EndSession;
  private _getSession: GetSession;

  private constructor() {
    this.storageService = new AsyncStorageService();
    //Initialize Session Repository
    this.sessionRepository = new FetchSessionRepository(this.storageService);
    this._createSessionWithPassword = new CreateSessionWithPassword(
      this.sessionRepository
    );
    this._endSession = new EndSession(this.sessionRepository);
    this._getSession = new GetSession(this.sessionRepository);
  }

  public static getInstance(): NTContainer {
    if (!NTContainer.instance) {
      NTContainer.instance = new NTContainer();
    }
    return NTContainer.instance;
  }

  // Session getters
  get createSessionWithPassword() {
    return this._createSessionWithPassword;
  }
  get endSession() {
    return this._endSession;
  }
  get getSession() {
    return this._getSession;
  }
}

export const container = NTContainer.getInstance();
