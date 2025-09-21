// src/hooks/useAuthors.ts
"use client";

import { useState, useEffect } from "react";
import { Author, fetchAuthors } from "@/app/authors/services/authorsService";

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthors();
  }, []);

  return { authors, isLoading, error };
}
