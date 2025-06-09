import * as SecureStore from "expo-secure-store";

export class AsyncStorageService {
  async setSecureItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async getSecureItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  async removeSecureItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
