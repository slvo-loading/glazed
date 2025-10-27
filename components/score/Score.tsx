'use client'
import { useState } from 'react'

interface ScoreProps {
    handleCount : () => void;
}

export default function Score({ handleCount }: ScoreProps ) {
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        scoring...
        <button onClick={handleCount}>done</button>
      </div>
    );
  }