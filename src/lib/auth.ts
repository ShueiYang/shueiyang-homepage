import { JWTPayload, SignJWT, jwtVerify } from "jose"


export function getJwtSecret () {
    const secret = process.env.JWT_SECRET
    if(!secret) {
        throw new Error("JWT_SECRET is not set")
    }
    return secret;
}

export async function signJWT (
    payload: {username: string},
    options: {expiresIn: string}
) {
    try {
        const secret = new TextEncoder().encode(getJwtSecret())
        const alg = "HS256"
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setSubject(payload.username)
            .setExpirationTime(options.expiresIn)
            .sign(secret)
        return jwt;
        
    } catch (err) {
        throw err;
    }
}

export async function verifyAuth(token: string) {
    try {
        const secret = new TextEncoder().encode(getJwtSecret())
        const verified = await jwtVerify(token, secret);
        return verified.payload as JWTPayload   
    } catch (err) {
        throw new Error("Jwt Token is not valid")
    }
}