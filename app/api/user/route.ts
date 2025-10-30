import { verifyUser } from '../lib/verifyUser'
import { db } from '../../utils/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';


export async function GET(req: Request,) {
    try {
        const decoded = await verifyUser(req);
        const uid = decoded.uid;

        const userRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists) {
            const newUser = {
                id: uid,
                email: decoded.email || "",
                resume: null,
                transcript: null,
                github: "",
                linkedin: "",
                scores: null,
                onboardStatus: null,
                onboardCompletedAt: null,
                createdAt: new Date(),
            };
            await setDoc(userRef, newUser);
            return Response.json(newUser);
        }

        return Response.json(userDoc.data())
    } catch (error) {
        console.error("Error fetching user data from /api/user:", error)
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 401 });
    }
}