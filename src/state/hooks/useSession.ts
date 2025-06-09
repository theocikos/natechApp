import { SplashScreen, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { Session } from "@/contexts/session/domain";
import { AppRoutes } from "@/enums/misc";
import { container } from "@/nucleus/Container";
import * as SecureStore from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

export type UseSessionType = {
  isReady: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
  session: Session | null;
};

export function useSession(): UseSessionType {
const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await container.createSessionWithPassword.execute(
          email,
          password
        );
        setSession(result);
        setIsAuthenticated(true);
        router.replace(AppRoutes.INDEX.build());
      } catch (err) {
        setError(err instanceof Error ? err.message : "SignIn failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await container.endSession.execute(session?.getId() || "");
      setIsAuthenticated(false);
      router.replace(AppRoutes.WELCOME.build());
    } catch (err) {
      setError(err instanceof Error ? err.message : "LogOut failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router, session]);

  useEffect(() => {
    const getAuthState = async () => {
      try {
        const value = await SecureStore.getItemAsync("session");
        if (value !== null) {
          const session = JSON.parse(value);
          setIsAuthenticated(!!session.accessToken);
          console.log("Session fetched from storage:", session);
        }
      } catch (error) {
        console.log("Error fetching session from storage", error);
      }
      setIsReady(true);
    };
    getAuthState();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return {
    isReady,
    isAuthenticated,
    isLoading,
    session,
    error,
    signIn,
    logOut,
  };
}
