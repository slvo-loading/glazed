'use client'
import { useState } from "react";
import { sendMagicLink, completeSignIn } from "./utils/auth";


export default function Home() {
  const [email, setEmail] = useState('')

  const handleSend = async () => {
    await sendMagicLink(email);
    alert("Check your email for the login link!");
  };


  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@g.ucla.edu" />
      <button onClick={handleSend}>Send Magic Link</button>
    </div>
  );
}
