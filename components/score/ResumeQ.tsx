'use client'

import { useState, useEffect } from 'react'
import { ResumeEdit } from './ResumeEdit'

type Experience = {
    company: string,
    responsibilities: string,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResumeQ({ handleResume } : { handleResume: any }) {

    const [file, setFile] = useState<File | null>(null)
    const [experiences, setExperiences] = useState<{ [key: string] :Experience}>({})
    const [open, setOpen] = useState<boolean>(false)

    const [selectdedCo, setSelectdedCo] = useState<string>('')
    const [selectedR, setSelectedR] = useState<string>('')
    const [selectedId, setSelectedId] = useState<string>('')

    const [privacy, setPrivacy] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')


    const saveExperience = (experience: Experience, id: string) => {
        setExperiences((prev) => {
            const newExperiences = { ...prev };
            newExperiences[id] = experience;
            return newExperiences;
        })
        setOpen(false)
        setSelectdedCo('')
        setSelectedId('')
        setSelectedR('')
    }

    const close = () => {
        setOpen(false)
    }

    const handleDelete = (id: string) => {
        setExperiences((prev) => {
            const newExperiences = { ...prev };
            delete newExperiences[id];
            return newExperiences;
        });
    };

    const handleEdit = (co: string, res: string, id: string) => {
        setSelectdedCo(co)
        setSelectedR(res)
        setSelectedId(id)
        setOpen(true)
    }

    useEffect(() => {
        if (file) {
            handleResume(file)
        } else {
            handleResume(experiences)
        }
    }, [file, experiences])


    return (
        <div>

            <label htmlFor="resume">Upload Resume:</label>
            <input type="file" id="resume" name="resume" accept="application/pdf" 
            onChange={e => setFile(e.target.files?.[0] ?? null)}/>

            <hr/>

            <span>Work Experience</span>
            <button onClick={() => setOpen(prev => !prev)}>Add Experience</button>
            {Object.entries(experiences).length > 0 && Object.entries(experiences).map(([id, experience]) => {
                return (
                    <div key={id}>
                        <span>Company: {experience.company}</span>
                        <p>Responsibilities: {experience.responsibilities}</p>
                        <button onClick={() => handleEdit(experience.company, experience.responsibilities, id)}>Edit</button>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                    </div>
                )
            })}

            {open && <ResumeEdit saveExperience={saveExperience} close={close} idE={selectedId} companyE={selectdedCo} responsibilitiesE={selectedR}/>}

        </div>
    )
}