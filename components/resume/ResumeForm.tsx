'use client'
import { useState, useEffect } from 'react'
import ResumeQ from './ResumeQ'
import { AnimatePresence, motion } from "framer-motion";

interface ResumeFormProps {
    handleCount : () => void;
    handleResume: (resume: string) => void;
}

type Experience = {
    company: string,
    responsibilities: string,
}

export default function ResumeForm({ handleCount, handleResume }: ResumeFormProps) {
    const [resumeCount, setResumeCount] = useState<number>(1)
    const [isFile, setIsFile] = useState<boolean>(false)
    const [resume, setResume] = useState<string>('')
    const[privacy, setPrivacy] = useState<boolean>(false)
    const [error, setError] = useState<string | null>('')

    const [experiences, setExperiences] = useState<Experience[]>()

    const handleSubmit = () => {
        if (resume.length === 0) { //basically if there is no resume
            setError('no resume item submitted')
            return;
        }

        let num = 0;
        let parseSuccess = false; //simulting parsing for now
        if (isFile) {
            //parse file and save the raw file to firebase
            parseSuccess = true;
            if (parseSuccess) {
                setExperiences([{company: 'nasa', responsibilities: 'nasaaaaa'}])
                // this is the result of the parse it'll prob be differen't but we'll work with that later 
                num = 1;
            }
        } else {
            //save to firebase json to firebase
            handleResume('saved manual to firebase')
            num = 2
            setIsFile(false)
        }

        setResume('')
        setIsFile(false)
        setResumeCount(prev => prev + num)
    }

    const handleIsFile = (input: boolean) => {
        setIsFile(input)
    }

    const handleRawResume = (input: string) => {
        setResume(input)
    }

    const handlePrivacy = () => {
        setPrivacy(prev => !prev)
    }

    const handleError = () => {
        setError(null)
    }

    useEffect(() => {
        if (resumeCount >= 3) {
            handleCount()
        }
    }, [resumeCount])

    useEffect(() => {
        console.log(resume)
    }, [resume])


    return(
        <div>
            <AnimatePresence mode="wait">
                {resumeCount === 1 && 
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ResumeQ 
                        handleResume={handleRawResume}
                        handleIsFile={handleIsFile}
                        resumeCount={resumeCount}
                        privacy={privacy}
                        handlePrivacy={handlePrivacy}
                        handleError={handleError}
                        />
                        <button onClick={handleSubmit}>Next</button>
                        {error && <span>{error}</span>}
                    </motion.div>
                }

                {resumeCount === 2 && 
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ResumeQ 
                        handleResume={handleRawResume}
                        handleIsFile={handleIsFile}
                        resumeCount={resumeCount}
                        parsedExperiences={experiences}
                        handleError={handleError}
                        />
                        <button onClick={handleSubmit}>Next</button>
                        {error && <span>{error}</span>}
                    </motion.div>
                }
                
            </AnimatePresence>
        </div>
    )
}