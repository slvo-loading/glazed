'use client'
import { useState } from 'react'

interface TranscriptFormProps {
    handleCount : () => void;
}

export default function ResumeForm({ handleCount }: TranscriptFormProps) {
    const [transcript, setTranscript] = useState<string>('')

    const handleSubmit = () => {
        handleCount()
    }

    return(
        <div>
            <input type='text' value={transcript} onChange={e => setTranscript(e.target.value)} placeholder="enter transcript"/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}