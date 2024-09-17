import { describe, expect, vi, test } from "vitest";
import { signJWT, verifyAuth } from "@/lib/auth";

describe("JWT Helpers", () => {
  const secret = "supersecretkey";
  const payload = { username: "testuser" };

  test("should sign a JWT with the correct payload", async () => {
    const token = await signJWT(payload, secret);

    expect(typeof token).toBe("string");

    // The token should contain 3 parts (header, payload, signature)
    const parts = token.split(".");
    expect(parts.length).toBe(3);
  });

  // Test for verifying a valid JWT
  test("should verify a valid JWT and return the payload", async () => {
    const token = await signJWT(payload, secret);
    const verifiedPayload = await verifyAuth(token, secret);

    // Check if the verified payload matches the original payload
    // 'sub' is set to username in signJWT
    expect(verifiedPayload.sub).toBe(payload.username);
  });

  test("should throw an error for an invalid JWT", async () => {
    const invalidToken = "invalid.token.string";

    await expect(verifyAuth(invalidToken, secret)).rejects.toThrow(
      "Jwt Token is not valid",
    );
  });

  test("should throw an error if the token is expired after 2 hours", async () => {
    const currentDate = new Date();
    vi.useFakeTimers().setSystemTime(currentDate);

    const expiredToken = await signJWT(payload, secret);

    // Simulate time passage to 2 hours later  (expired after 2 hours)
    vi.useFakeTimers().setSystemTime(currentDate.getTime() + 2 * 3600 * 1000);

    await expect(verifyAuth(expiredToken, secret)).rejects.toThrow(
      "Jwt Token is not valid",
    );

    vi.useRealTimers();
  });
});
