'use client'
import { useState } from 'react'

interface ResumeFormProps {
    handleCount : () => void;
    handleResume: (resume: string) => void;
}

export default function ResumeForm({ handleCount, handleResume }: ResumeFormProps) {
    const [resume, setResume] = useState<string>('')

    const handleSubmit = () => {
        handleResume(resume)
        handleCount()
    }

    return(
        <div>
            <input type='text' value={resume} onChange={e => setResume(e.target.value)} placeholder="enter resume"/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}