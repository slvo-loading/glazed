
'use client' 

import { useEffect } from "react";
import { completeSignIn } from "../utils/auth";


export default function CompleteSignIn() {


    useEffect(() => {
        const handleComplete = async () => {
            const user = await completeSignIn();
            console.log("Logged in user:", user);
        };

        handleComplete()
    })

    return (
        <div>
            Loading ...
        </div>
    );
}