import { adminAuth } from './fireabseAdmin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function verifyUser(req: any) {
    const authHeader = req.headers.get("authorization");
    console.log('authheader in verify user', authHeader)

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Missing or invalid authorization header")
    }

    const token = authHeader.split(" ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
}