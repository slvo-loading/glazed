'use client'
import { useState } from 'react'
import { Experience } from '../../utils/types'

interface ResumeEditProps {
    saveExperience: (experience: Experience) => void;
    close: () => void;
    selected: Experience | null;
}

export function ResumeEdit({ saveExperience, close, selected}: ResumeEditProps) {
    const [company, setCompany] = useState<string>(selected?.company ?? '')
    const [responsibilities, setResponsibilities] = useState<string>(selected?.responsibilities ?? '')
    const [missingCo, setMissingCo] = useState<boolean>(false)
    const [missingR, setMissingR] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [warning, setWarning] = useState<boolean>(false)

    const handleSave = () => {
        setLoading(true)
        let missingC = false
        let missingR = false
        if (company === '') {
            setMissingCo(true)
            missingC = true
        }

        if (responsibilities === '') {
            setMissingR(true)
            missingR = true
        }

        if (missingC && missingR) {
            setLoading(false)
            return;
        } else {
            saveExperience({
                company: company,
                responsibilities: responsibilities
            })
        }
    }

    const handleWarning = () => {
        if (company === '' && responsibilities === '') {
            close();
        } else {
            setWarning(true)
        }
    }

    return(
        <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="company">Company:</label>
                <input style={{border: '2px solid black'}} type="text" id="company" name="company" value={company}
                onChange={e => {setMissingCo(false); setCompany(e.target.value)}}/>
                {missingCo && <span>Please enter the company</span>}
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="responsibilities">Responsibilities:</label>
                <textarea style={{border: '2px solid black'}} id="responsibilities" name="responsibilities" value={responsibilities}
                onChange={e => {setMissingR(false); setResponsibilities(e.target.value)}}></textarea>
                {missingR && <span>Please enter your responsibilities</span>}
            </div>

            <button onClick={handleSave}>Add</button>
            <button onClick={handleWarning}>Close</button>

            {warning &&
                <div>
                    <span>You have not saved your answers yet, are you sure?</span>
                    <button onClick={close}>Yes, Close</button>
                    <button onClick={() => setWarning(false)}>No</button>
                </div>
            }
        </div>
    )
}