import { useMemo, useState } from "react";
import { apiFetch } from "../api/client";
import type { ApplyPayLoad, ApplyResponse, Candidate, Job } from "../api/types";
import { StatusBanner } from "./StatusBanner";
import { endpoints } from "../api/endpoints";

type Props = {
    job: Job;
    candidate: Candidate
};

function isValidGithubRepoUrl( url: string){
    try {
        const u = new URL(url);
        if (u.hostname !== "github.com") return false;
        const parts = u.pathname.split("").filter(Boolean);
        return parts.length >=2;
    } catch {
        return false;
    }
}

export function JobCard({ job, candidate }: Props) {
    const [repoUrl, setRepoUrl] = useState("https://github.com/gianvangeli/botfilter-challenge");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        return repoUrl.trim().length > 0 && isValidGithubRepoUrl(repoUrl.trim());

    }, [repoUrl]);

    async function handleSubmit() {
        const trimmed = repoUrl.trim();
        if (!isValidGithubRepoUrl(trimmed)) {
            setStatus("error")
            setError("Ingresa una URL de repo de GitHub (github.com/owner/repo).");
            return;
        }
        
        setStatus("submitting");
        setError(null);

        const payload: ApplyPayLoad = {
            uuid: String(candidate.uuid),
            jobId: String(job.id),
            candidateId: String(candidate.candidateId),
            applicationId: String(candidate.applicationId),
            repoUrl: trimmed,
        };
        
        try {
            const res = await apiFetch<ApplyResponse>(endpoints.applyToJob, {
                method: "POST",
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
                setError("La API respondio pero no devolvio ok.");
            }
        } catch (e: unknown){
            setStatus("error");
            setError(e instanceof Error ? e.message : "Error desconocido");
        }
    }

    return (
        <div className="card">
            <div className="card_header">
                <div className="card_title">{job.title}</div>
                <div className="card_subtitle">Job ID: {job.id}</div>
            </div>

            <label className="field">
                <span className="field_label">Repo URL (GitHub)</span>
                <input 
                    className="input"
                    placeholder=""
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    disabled={status === "submitting"}
                    inputMode="url"
                />
                <span className="field_hint">Ej: https://github.com/owner/repo</span>
            </label>

            <div className="actions">
                <button
                    className="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit || status === "submitting"} 
                >
                    {status === "submitting" ? "Submitting..." : "Submit"}
                 
                </button>
            </div>

            {status === "success" ? (
                <StatusBanner
                    variant="success"
                    title="Postulacion enviada!"
                    description="La API respondio ok."
                />
            ): null}

            {status === "error" ? (
                <StatusBanner
                    variant="error"
                    title="No se pudo enviar la postulacion"
                    description={error ?? "Error inesperado"}
                />
            ) : null}
        </div>
    );
}