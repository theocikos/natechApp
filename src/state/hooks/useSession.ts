import { useRouter, useSegments } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { Session } from "@/contexts/session/domain";
import { AppRoutes } from "@/enums/misc";
import { container } from "@/nucleus/Container";

export type UseSessionType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => void;
  session: Session | null;
};

export function useSession(): UseSessionType {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inSession = segments[0] === "(with-session)";

    if (isAuthenticated && !inSession) {
      router.replace(AppRoutes.HOME.build());
    } else if (!isAuthenticated && inSession) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, router]);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await container.createSessionWithPassword.execute(
        email,
        password
      );
      setSession(result);
      setIsAuthenticated(true);
      router.replace(AppRoutes.HOME.build());
    } catch (err) {
      setError(err instanceof Error ? err.message : "SignIn failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    isAuthenticated,
    isLoading,
    session,
    error,
    signIn,
  };
}
