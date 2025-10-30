/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserData } from './types'
import { auth } from './firebase'

const UserContext = createContext<UserData | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [hasRedirected, setHasRedirected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("Auth state changed, user:", firebaseUser);
            
            if (firebaseUser) {
              console.log("Auth state changed, user:", firebaseUser);
              const token = await firebaseUser.getIdToken(true); // force refresh
              await fetchUserData(token);
            } else {
              setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchUserData = async(token: string) => {
      console.log('sending token in fethcuserdata', token)
      try {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await res.json();
        console.log(userData)
        setUser(userData)

      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      console.log(user)
    }, [user])

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);