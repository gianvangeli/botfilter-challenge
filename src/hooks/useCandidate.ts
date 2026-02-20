import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { Candidate } from "../api/types";

type State =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: Candidate; error: null }
  | { status: "error"; data: null; error: string };

export function useCandidate(email: string) {
  const [state, setState] = useState<State>({
    status: "idle",
    data: null,
    error: null,
  });

  const normalizedEmail = useMemo(() => email.trim(), [email]);

  useEffect(() => {
    if (!normalizedEmail) return;

    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    apiFetch<Candidate>(endpoints.candidateByEmail(normalizedEmail))
      .then((data) => {
        if (cancelled) return;
        setState({ status: "success", data, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Unknown error";
        setState({ status: "error", data: null, error: msg });
      });

    return () => {
      cancelled = true;
    };
  }, [normalizedEmail]);

  return state;
}