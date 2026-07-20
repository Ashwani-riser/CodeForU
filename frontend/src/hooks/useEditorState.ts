"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DEFAULT_CODE } from "@/constants";

interface SavedEditorState {
  language: string;
  codeByLanguage: Record<string, string>;
}

const STORAGE_PREFIX = "editor_state_";

export function useEditorState(slug: string) {
  const storageKey = `${STORAGE_PREFIX}${slug}`;

  const [language, setLanguageState] = useState<string>("cpp");
  const [codeByLanguage, setCodeByLanguage] = useState<Record<string, string>>({
    cpp: DEFAULT_CODE.cpp,
    c: DEFAULT_CODE.c,
    java: DEFAULT_CODE.java,
    python: DEFAULT_CODE.python,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved: SavedEditorState = JSON.parse(raw);
        if (saved.language && saved.codeByLanguage) {
          setLanguageState(saved.language);
          setCodeByLanguage((prev) => ({ ...prev, ...saved.codeByLanguage }));
        }
      }
    } catch {}
  }, [storageKey]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(
    (lang: string, codes: Record<string, string>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify({ language: lang, codeByLanguage: codes }));
        } catch {}
      }, 500);
    },
    [storageKey]
  );

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageState(lang);
      persist(lang, codeByLanguage);
    },
    [codeByLanguage, persist]
  );

  const setCode = useCallback(
    (code: string) => {
      setCodeByLanguage((prev) => {
        const next = { ...prev, [language]: code };
        persist(language, next);
        return next;
      });
    },
    [language, persist]
  );

  const code = codeByLanguage[language] ?? "";

  return { language, setLanguage, code, setCode };
}
