'use client'
import { useState, useEffect } from 'react'
import ResumeForm from '../../components/resume/ResumeForm'
import TranscriptForm from '../../components/TranscriptForm'
import GithubForm from '../../components/GithubForm'
import Score from '../../components/Score'
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Onboard() {
    const router = useRouter();
    const [count, setCount] = useState<number>(1)
    const [resume, setResume] = useState<string | null>(null)
    const [transcript, setTranscript] = useState<string | null>(null)
    const [linkedin, setLinkedin] = useState<string | null>(null)
    const [leetcode, setLeetcode] = useState<string | null>(null)
    const [github, setGithub] = useState<string | null>(null)

    const handleCount = () => {
        setCount(prev => prev + 1)
    }

    const handleResume = (input: string) => {
        setResume(input)
    }

    const handleTranscript = (input: string) => {
        setTranscript(input)
    }

    const handleLinkedin = (input: string) => {
        setLinkedin(input)
    }

    const handleLeetcode = (input: string) => {
        setLeetcode(input)
    }

    const handleGithub = (input: string) => {
        setGithub(input)
    }

    useEffect(() => {
        if (count === 5) {
            router.push("/dashboard");
        }
    }, [count, router])


    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <AnimatePresence mode="wait">

        {count === 1 && 
            <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                <ResumeForm handleCount={handleCount} handleResume={handleResume}/>
            </motion.div>
        }

        {count === 2 && 
            <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            >
                <TranscriptForm handleCount={handleCount} handleTranscript={handleTranscript}/>
            </motion.div>
        }

        {count === 3 && 
            <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            >
                <GithubForm
                handleCount={handleCount}
                handleLinkedin={handleLinkedin}
                handleLeetcode={handleLeetcode}
                handleGithub={handleGithub}
                />
            </motion.div>
        }

        {count === 4 && (
            <motion.div
            key="step4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            >
            <Score handleCount={handleCount}/>
            </motion.div>
        )}

        </AnimatePresence>
      </div>
    );
  }