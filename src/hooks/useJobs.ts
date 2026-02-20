import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { Job } from "../api/types";

type State = 
    | { status: "loading"; data: null; error: null }
    | { status: "success"; data: Job[]; error: null }
    | { status: "error"; data: null; error: string }

export function useJobs() {
    const [state, setState] = useState<State>({
        status: "loading",
        data: null,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;

        apiFetch<Job[]>(endpoints.jobsList)
            .then((data) => {
                if (cancelled) return;
                setState({ status: "success", data, error: null });
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                const msg = err instanceof Error ? err.message : "Unknown error";
                setState ({ status: "error", data: null, error: msg });
            });
        
        return () => {
            cancelled = true;
        };
    }, []);

    return state;
}