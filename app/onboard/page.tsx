'use client'
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from 'react'
import GithubForm from '../components/GithubForm'
import ResumeForm from '../components/resume/ResumeForm'
import Score from '../components/Score'
import TranscriptForm from '../components/transcript/TranscriptForm'

// fetch the part that we're on from the database

export default function Onboard() {
    const router = useRouter();
    const [count, setCount] = useState<number>(1)

    const handleCount = useCallback(() => {
        setCount(prev => prev + 1)
    }, [])

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
                <ResumeForm handleCount={handleCount}/>
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
                <TranscriptForm handleCount={handleCount}/>
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