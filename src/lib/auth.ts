import { User } from "@/types";

const STORAGE_KEY = "bidsmith_user";

export const mockUser: User = {
  id: "usr_001",
  name: "James Patterson",
  email: "james.patterson@councilbids.co.uk",
  company: "London Borough Council",
  plan: "enterprise",
};

export const login = (email: string, password: string): User | null => {
  // Mock authentication
  if (email && password) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
