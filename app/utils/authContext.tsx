/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from '../utils/firebase'
import { getDoc, doc } from 'firebase/firestore';

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [hasRedirected, setHasRedirected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            console.log("Auth state changed, user:", firebaseUser);
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const redirect = async () => {
          if (!user || hasRedirected) return;
      
          const userDoc = await getDoc(doc(db, "users", user.uid));
      
          if (userDoc.exists()) {
            router.push("/dashboard");
          } else {
            router.push("/scoreForm");
          }
      
          setHasRedirected(true);
        };
      
        redirect();
    }, [user, router, hasRedirected]);



    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);