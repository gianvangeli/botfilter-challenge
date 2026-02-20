export type Candidate = {
    uuid: string;
    candidateId: string;
    applicationId: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type Job = {
    id: string;
    title: string;
};

export type ApplyPayLoad = {
    uuid: string;
    jobId: string;
    candidateId: string;
    applicationId: string;
    repoUrl: string;
};

export type ApplyResponse = {
    ok: boolean;
};