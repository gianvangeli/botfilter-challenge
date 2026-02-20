export const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const endpoints = {
    candidateByEmail: (email: string) =>
        `/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
    jobsList: "/api/jobs/get-list",
    applyToJob: "/api/candidate/apply-to-job",
};

