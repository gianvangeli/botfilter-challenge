import { useMemo, useState } from "react";
import { useCandidate } from "../hooks/useCandidate";
import { useJobs } from "../hooks/useJobs";
import { JobCard } from "../components/JobCard";
import { StatusBanner } from "../components/StatusBanner";

export function JobsPage() {
    const [email, setEmail] = useState("gian.vangeli13@gmail.com");

    const candidate = useCandidate(email)
    const jobs = useJobs();

    const canShowJobs = useMemo(
        () => candidate.status === "success",
        [candidate.status]
    );

    return (
        <div className="container">
            <header className="header">
                <h1 className="h1">BotFilter Challenge</h1>
                <p className="muted">
                    1- Ingresa tu email para obtener tus datos.
                    2- Elegi una posicion y envia tu repo.
                </p>
            </header>

            <section className="card">
                <div className="card_header">
                    <div className="card_title">Tus datos de candidato</div>
                    <div className="card_subtitle">
                        Se consultan desde la API por email.
                    </div>
                </div>

                <label className="field">
                    <span className="field_label">Email</span>
                    <input 
                        className="input"
                        placeholder="gian.vangeli13@gmail.com"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        inputMode="email"
                    />
                    <span className="field_hint">
                        Pegalo tal cual el que usaste para registrarte.
                    </span>
                </label>

                {candidate.status === "loading" ? (
                    <StatusBanner variant="info" title="Buscando candidato..." />
                ) : null}

                {candidate.status === "success" ? (
                    <StatusBanner
                        variant="success"
                        title={`Hola ${candidate.data.firstName} ${candidate.data.lastName}`}
                        description={`UUID: ${candidate.data.uuid} · CandidateID: ${candidate.data.candidateId}`}
                    />
                ) : null}
            </section>

            <section className="section">
                <div className="section_title">Posiciones abiertas</div>

                {jobs.status === "loading" ? (
                    <StatusBanner variant="info" title="Cargando posiciones..." />
                ): null}

                {jobs.status === "error" ? (
                    <StatusBanner 
                        variant="error"
                        title="No se pudieron cargar las posiciones"
                        description={jobs.error}
                    />
                ) : null}

                {jobs.status === "success" && jobs.data.length === 0 ? (
                    <StatusBanner variant="info" title="No hay posiciones disponibles." />

                ): null }

                {jobs.status ==="success" && !canShowJobs ? (
                    <StatusBanner 
                        variant="info"
                        title="Ingresa tu email para habilitar el submit"
                        description="Ncesitamos tu uuid y candidateId para aplicar"
                    />
                ): null}

                {jobs.status === "success" &&  candidate.status === "success" ? (
                    <div className="grid">
                        {jobs.data.map((job)=> (
                            <JobCard key={job.id} job={job} candidate={candidate.data} />
                        ))}
                    </div>
                ) : null }
            </section>

            <footer className="footer muted">
                Hecho con React + TypeScrip - UI simplre, estados claros, manejo de errores.
            </footer>
        </div>
    );
}