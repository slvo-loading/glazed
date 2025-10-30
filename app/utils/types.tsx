export type Experience = {
    company: string,
    responsibilities: string,
}

export type UserData = {
    id: string,
    email: string,
    resumeURL: string | null,
    resume: Experience[] | null,
    transcriptURL: string | null,
    githubURL: string,
    linkedinURL: string,
    scores: null,
    onboardStatus: null,
    onboardCompletedAt: null,
    createdAt: string, 
};