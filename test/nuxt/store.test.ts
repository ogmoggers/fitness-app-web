import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "@/shared/stores/auth.store";
import * as firebaseAuth from "firebase/auth";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock("~/shared/config/firebase.config", () => ({
  getFirebaseAuth: vi.fn(() => ({})),
}));

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("has correct initial state", () => {
    const store = useAuthStore();
    expect(store.user).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.isAuthenticated).toBe(false);
  });

  it("signs in user successfully", async () => {
    const store = useAuthStore();
    const mockUser = { uid: "123", email: "test@test.com" };

    vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue({
      user: mockUser,
    } as any);

    const result = await store.signIn("test@test.com", "password123");

    expect(result.success).toBe(true);
    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
  });

  it("handles sign in error", async () => {
    const store = useAuthStore();

    vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockRejectedValue({
      code: "auth/wrong-password",
    });

    const result = await store.signIn("test@test.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Неверный пароль");
  });

  it("signs up user successfully", async () => {
    const store = useAuthStore();
    const mockUser = { uid: "456", email: "new@test.com" };

    vi.mocked(firebaseAuth.createUserWithEmailAndPassword).mockResolvedValue({
      user: mockUser,
    } as any);

    const result = await store.signUp("new@test.com", "password123");

    expect(result.success).toBe(true);
    expect(store.user).toEqual(mockUser);
  });

  it("logs out user successfully", async () => {
    const store = useAuthStore();
    store.user = { uid: "123" } as any;

    vi.mocked(firebaseAuth.signOut).mockResolvedValue(undefined);

    const result = await store.logout();

    expect(result.success).toBe(true);
    expect(store.user).toBeNull();
  });
});