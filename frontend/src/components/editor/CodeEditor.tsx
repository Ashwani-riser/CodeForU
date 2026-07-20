"use client";

import { useRef } from "react";
import Editor, { type OnMount, type OnChange } from "@monaco-editor/react";
import { useThemeStore } from "@/store/useThemeStore";

const CODEFORU_DARK = {
  inherit: true,
  base: "vs-dark" as const,
  rules: [
    { token: "keyword", foreground: "c084fc", fontStyle: "bold" },
    { token: "keyword.control", foreground: "c084fc" },
    { token: "string", foreground: "34d399" },
    { token: "string.escape", foreground: "6ee7b7" },
    { token: "number", foreground: "fbbf24" },
    { token: "comment", foreground: "64748b", fontStyle: "italic" },
    { token: "type", foreground: "22d3ee" },
    { token: "type.identifier", foreground: "22d3ee" },
    { token: "function", foreground: "818cf8" },
    { token: "function.declaration", foreground: "818cf8" },
    { token: "variable", foreground: "e2e8f0" },
    { token: "variable.predefined", foreground: "fb7185" },
    { token: "operator", foreground: "fb7185" },
    { token: "delimiter", foreground: "94a3b8" },
    { token: "delimiter.bracket", foreground: "94a3b8" },
    { token: "predefined", foreground: "f472b6" },
    { token: "identifier", foreground: "e2e8f0" },
    { token: "annotation", foreground: "fbbf24" },
  ],
  colors: {
    "editor.background": "#1a1525",
    "editor.foreground": "#e2e8f0",
    "editor.lineHighlightBackground": "#251e36",
    "editor.selectionBackground": "#4c1d9540",
    "editor.inactiveSelectionBackground": "#4c1d9520",
    "editorCursor.foreground": "#a78bfa",
    "editorLineNumber.foreground": "#4a3f6b",
    "editorLineNumber.activeForeground": "#a78bfa",
    "editorIndentGuide.background": "#2a2240",
    "editorIndentGuide.activeBackground": "#4c1d9550",
    "editor.selectionHighlightBackground": "#4c1d9520",
    "editorBracketMatch.background": "#4c1d9530",
    "editorBracketMatch.border": "#7c3aed50",
    "editorGutter.background": "#1a1525",
    "scrollbar.shadow": "#00000030",
    "scrollbarSlider.background": "#4c1d9530",
    "scrollbarSlider.hoverBackground": "#4c1d9550",
    "scrollbarSlider.activeBackground": "#4c1d9570",
  },
};

const CODEFORU_LIGHT = {
  inherit: true,
  base: "vs" as const,
  rules: [
    { token: "keyword", foreground: "7c3aed", fontStyle: "bold" },
    { token: "string", foreground: "059669" },
    { token: "number", foreground: "d97706" },
    { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
    { token: "type", foreground: "0891b2" },
    { token: "function", foreground: "4f46e5" },
    { token: "variable", foreground: "1e293b" },
    { token: "operator", foreground: "e11d48" },
    { token: "predefined", foreground: "db2777" },
  ],
  colors: {
    "editor.background": "#faf8ff",
    "editor.foreground": "#1e293b",
    "editorCursor.foreground": "#7c3aed",
    "editorLineNumber.foreground": "#c4b5fd",
    "editorLineNumber.activeForeground": "#7c3aed",
    "editor.selectionBackground": "#7c3aed20",
    "editorIndentGuide.background": "#ede9fe",
    "editorIndentGuide.activeBackground": "#7c3aed30",
  },
};

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
  fontSize?: number;
}

export function CodeEditor({ language, value, onChange, height = "100%", fontSize = 15 }: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const { theme } = useThemeStore();

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange: OnChange = (val) => {
    if (val !== undefined) onChange(val);
  };

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      theme={theme === "dark" ? "codeforu-dark" : "codeforu-light"}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("codeforu-dark", CODEFORU_DARK);
        monaco.editor.defineTheme("codeforu-light", CODEFORU_LIGHT);
      }}
      onMount={handleMount}
      onChange={handleChange}
      options={{
        fontSize,
        fontFamily: "var(--font-geist-mono), 'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
        minimap: { enabled: false },
        wordWrap: "off",
        bracketPairColorization: { enabled: true },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        padding: { top: 16, bottom: 16 },
        lineNumbers: "on",
        renderLineHighlight: "line",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        folding: true,
        guides: { bracketPairs: true },
      }}
    />
  );
}
