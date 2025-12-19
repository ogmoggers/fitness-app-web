import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "../../app/shared/stores/auth.store";

let signInWithPassword: ReturnType<typeof vi.fn> | undefined;
let signUp: ReturnType<typeof vi.fn> | undefined;
let signOut: ReturnType<typeof vi.fn> | undefined;

vi.mock("../../app/shared/utils/supabase", () => {
  const _signInWithPassword = vi.fn();
  const _signUp = vi.fn();
  const _signOut = vi.fn();
  return {
    __esModule: true,
    supabase: {
      auth: {
        signInWithPassword: _signInWithPassword,
        signUp: _signUp,
        signOut: _signOut,
      },
    },
    signInWithPassword: _signInWithPassword,
    signUp: _signUp,
    signOut: _signOut,
  };
});

describe("Auth Store", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    const mocked = await import("../../app/shared/utils/supabase");
    signInWithPassword = mocked.signInWithPassword;
    signUp = mocked.signUp;
    signOut = mocked.signOut;
  });

  it("has correct initial state", () => {
    const store = useAuthStore();
    expect(store.user).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.isAuthenticated).toBe(false);
  });

  it("signs in user successfully", async () => {
    const store = useAuthStore();
    const mockUser = { id: "123", email: "test@test.com" };
    signInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await store.signIn("test@test.com", "password123");

    expect(result.success).toBe(true);
    expect(store.user).toEqual(mockUser);
    expect(store.isAuthenticated).toBe(true);
  });

  it("handles sign in error", async () => {
    const store = useAuthStore();
    signInWithPassword.mockRejectedValue({ message: "Ошибка входа" });

    const result = await store.signIn("test@test.com", "wrong");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Ошибка входа");
  });

  it("signs up user successfully", async () => {
    const store = useAuthStore();
    const mockUser = { id: "456", email: "new@test.com" };
    signUp.mockResolvedValue({ data: { user: mockUser }, error: null });

    const result = await store.signUp("new@test.com", "password123");

    expect(result.success).toBe(true);
    expect(store.user).toEqual(mockUser);
  });

  it("logs out user successfully", async () => {
    const store = useAuthStore();
    store.user = { id: "123" } as any;
    signOut.mockResolvedValue({});

    const result = await store.logout();

    expect(result.success).toBe(true);
    expect(store.user).toBeNull();
  });
});
