'use client'
import { useState } from 'react'

interface GithubFormProps {
    handleCount : () => void;
    handleLinkedin: (linkedin: string) => void;
    handleLeetcode: (leetcode: string) => void;
    handleGithub: (github: string) => void;

}

export default function ResumeForm({ handleCount, handleLinkedin, handleLeetcode, handleGithub }: GithubFormProps) {
    const [linkedin, setLinkedin] = useState<string>('')
    const [leetcode, setLeetcode] = useState<string>('')
    const [github, setGithub] = useState<string>('')

    const handleSubmit = () => {
        handleLinkedin(linkedin)
        handleLeetcode(leetcode)
        handleGithub(github)
        handleCount()
    }

    return(
        <div>
            <input type='text' value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="enter linkedin"/>
            <input type='text' value={leetcode} onChange={e => setLeetcode(e.target.value)} placeholder="enter leetcode"/>
            <input type='text' value={github} onChange={e => setGithub(e.target.value)} placeholder="enter github"/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}