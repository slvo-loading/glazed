import { verifyUser } from '../lib/verifyUser'
import { db } from '../../utils/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

export async function GET(req: Request,) {
    try {
        console.log('touched user api')
        const decoded = await verifyUser(req);
        const uid = decoded.uid;
        console.log('authenticated request')

        const userRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userRef);
        console.log('userdoc', userDoc.exists())

        if (!userDoc.exists()) {
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
            console.log('created new user')
            return Response.json(newUser);
        } else {
            console.log('existing user found')
            return Response.json(userDoc.data());
        }

    } catch (error) {
        console.error("Error fetching user data from /api/user:", error)
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 401 });
    }
}