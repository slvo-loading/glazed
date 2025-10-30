'use client'

import { useState, useEffect, useRef } from 'react'
import { ResumeEdit } from './ResumeEdit'
import { Experience } from '../../utils/types'

interface ResumeQProps {
    handleResume: (resume: File | Experience[] | null) => void;
    resumeCount: number;
    parsedExperiences?: Experience[];
    privacy?: boolean;
    handlePrivacy?: () => void;
    handleError:() => void;
}


export default function ResumeQ({ handleResume, resumeCount, parsedExperiences, privacy, handlePrivacy, handleError }: ResumeQProps) {

    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [experiences, setExperiences] = useState<Experience[]>(parsedExperiences || [])
    const [open, setOpen] = useState<boolean>(false)

    const[selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [selected, setSelected] = useState<Experience | null>(null)


    const handleDelete = (i: number) => {
        setExperiences((prev) => prev.filter((_, index) => index !== i));
    };

    const handleEdit = (i: number) => {
        setSelectedIndex(i)
        setSelected(experiences[i])
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
        setSelectedIndex(null)
        setSelected(null)
    }

    const saveExperience = (experience: Experience) => {
        if (selectedIndex !== null) {
            setExperiences((prev) => {
                const newExperiences = [ ...prev ];
                newExperiences[selectedIndex] = experience;
                return newExperiences;
            })
        } else {
            setExperiences(prev => [...prev, experience])
        }

        close()
    }

    const deleteFile = () => {
        setFile(null);
      
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
    }

    useEffect(() => {
        if (file) {
            handleResume(file)
        } else if (experiences.length > 0) {
            handleResume(experiences)
        } else {
            handleResume(null)
        }
    }, [file, experiences])

    useEffect(() => {
        console.log("experiences received in resumeq", experiences)
    }, [experiences])

    return (
        <div>
            {resumeCount === 1 && 
                <div style={{display:'flex', flexDirection:'column'}}>
                    <button onClick={handlePrivacy}>{privacy ? "Private" : "Public"}</button>
                    <label htmlFor="resume">Upload Resume:</label>
                    <input ref={fileInputRef} type="file" id="resume" name="resume" accept="application/pdf" 
                    onChange={e => {setFile(e.target.files?.[0] ?? null); handleError()}}/>
                    <button onClick={deleteFile}>Delete File</button>
                    <hr/>
                </div>
            }

             <span>Work Experience</span>
             <button onClick={() => {setOpen(prev => !prev); handleError()}}>Add Experience</button>
            {experiences.map((experience, i) => {
                return (
                    <div key={i}>
                        <span>Company: {experience.company}</span>
                        <p>Responsibilities: {experience.responsibilities}</p>
                        <button onClick={() => handleEdit(i)}>Edit</button>
                        <button onClick={() => handleDelete(i)}>Delete</button>
                    </div>
                )
            })}

            {open && <ResumeEdit saveExperience={saveExperience} close={close} selected={selected}/>}

        </div>
    )
}