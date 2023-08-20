import { JWTPayload, SignJWT, jwtVerify } from "jose";


// function to sign the JWT
export async function signJWT(
  payload: { username: string },
  secret: string
): Promise<string> {
  try {
    const jwtSecret = new TextEncoder().encode(secret);
    const alg = "HS256";
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 2; // 2 hours

    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt(iat)
      .setSubject(payload.username)
      .setExpirationTime(exp)
      .sign(jwtSecret);

  } catch (err) {
    throw err;
  }
}


// function to verify and validate the JWT
export async function verifyAuth(token: string, secret: string) {
  try {
    const jwtSecret = new TextEncoder().encode(secret);
    const verified = await jwtVerify(token, jwtSecret);
    return verified.payload as JWTPayload;
  } catch (err) {
    throw new Error("Jwt Token is not valid");
  }
}