import { useEffect, useState, useCallback } from "react";
import type { User } from "@/lib/types";
import { DEMO_USERS } from "@/lib/mock-data/seed";

const STORAGE_KEY = "pyrarides.auth.user.v1";

function readUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(readUser());
    setIsLoading(false);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUser(readUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const signIn = useCallback(async (_identifier: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 350));
    const next = DEMO_USERS.rider;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return next;
  }, []);

  const signUp = useCallback(async (data: { fullName: string; email: string; phoneNumber?: string }) => {
    await new Promise((r) => setTimeout(r, 400));
    const next: User = {
      ...DEMO_USERS.rider,
      id: `u-${Date.now()}`,
      fullName: data.fullName || DEMO_USERS.rider.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      rankPoints: 0,
      currentLeague: "wood",
      isTrustedRider: false,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setUser(next);
    return next;
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, isLoading, signIn, signUp, signOut, isAuthenticated: !!user };
}
