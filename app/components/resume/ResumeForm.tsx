'use client'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { storage } from '../../utils/firebase';
import ResumeQ from './ResumeQ';
import { Experience } from '../../utils/types'


interface ResumeFormProps {
    handleCount : () => void;
}


export default function ResumeForm({ handleCount }: ResumeFormProps) {
    const [resumeCount, setResumeCount] = useState<number>(1)
    const [resume, setResume] = useState<File| Experience[] | null>(null)
    const[privacy, setPrivacy] = useState<boolean>(false)
    const [error, setError] = useState<string | null>('')
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const uploadToFirebase = async(file: File) => {
        const fileRef = ref(storage, `resumes/${file.name}-${Date.now()}`);

        try {
            await uploadBytes(fileRef, file);
            const resumeUrl = await getDownloadURL(fileRef);
            return { resumeUrl };
        } catch (err) {
            console.error("Firebase upload failed:", err);
            return { uploadError: "Upload failed" };
        }
    }

    const handleSubmit = async() => {
        setLoading(true)
        try {
            if (resume === null) { //basically if there is no resume
                throw new Error ("No resume uploaded.")
            }

            console.log('resume to be submitted:', resume)


            if (resume instanceof File) {
                const { resumeUrl, uploadError } = await uploadToFirebase(resume)

                if (uploadError) {
                    throw new Error (uploadError)
                }

                const res = await fetch("/api/parse-resume", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resumeUrl }),
                });

                if (!res.ok) throw new Error("Parsing failed");

                const data = await res.json();
                setExperiences(data.experiences)
                setResumeCount(prev => prev + 1)
            } else {
                //save part + resume to firebase
                setResumeCount(prev => prev + 2)
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error))
            console.error(error)
        } finally {
            setLoading(false)
            setResume(null)
        }
    }

    const handleRawResume = (input: File | Experience[] | null) => {
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
    }, [resumeCount, handleCount])


    if (loading) {
        return(<div>Loading...</div>)
    }


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