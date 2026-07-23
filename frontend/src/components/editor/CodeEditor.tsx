"use client";

import { useRef, useCallback } from "react";
import Editor, { type OnMount, type OnChange } from "@monaco-editor/react";
import { useThemeStore } from "@/store/useThemeStore";

const CODEFORU_DARK = {
  inherit: true,
  base: "vs-dark" as const,
  rules: [
    { token: "keyword", foreground: "c586c0", fontStyle: "bold" },
    { token: "keyword.control", foreground: "c586c0" },
    { token: "string", foreground: "7ee787" },
    { token: "string.escape", foreground: "a5d6ff" },
    { token: "number", foreground: "f0883e" },
    { token: "comment", foreground: "6a9955", fontStyle: "italic" },
    { token: "type", foreground: "4ec9b0" },
    { token: "type.identifier", foreground: "4ec9b0" },
    { token: "function", foreground: "dcdcaa" },
    { token: "function.declaration", foreground: "dcdcaa" },
    { token: "variable", foreground: "e2e8f0" },
    { token: "variable.predefined", foreground: "ff7b72" },
    { token: "operator", foreground: "d4d4d4" },
    { token: "delimiter", foreground: "808080" },
    { token: "delimiter.bracket", foreground: "808080" },
    { token: "predefined", foreground: "c586c0" },
    { token: "identifier", foreground: "e2e8f0" },
    { token: "annotation", foreground: "f0883e" },
    { token: "constant", foreground: "79c0ff" },
  ],
  colors: {
    "editor.background": "#0D1117",
    "editor.foreground": "#e2e8f0",
    "editor.lineHighlightBackground": "#161b22",
    "editor.selectionBackground": "#264f78",
    "editor.inactiveSelectionBackground": "#264f7850",
    "editorCursor.foreground": "#ffffff",
    "editorLineNumber.foreground": "#484f58",
    "editorLineNumber.activeForeground": "#e2e8f0",
    "editorIndentGuide.background": "#21262d",
    "editorIndentGuide.activeBackground": "#30363d",
    "editor.selectionHighlightBackground": "#264f7840",
    "editorBracketMatch.background": "#264f7850",
    "editorBracketMatch.border": "#58a6ff",
    "editorGutter.background": "#0D1117",
    "scrollbar.shadow": "#00000030",
    "scrollbarSlider.background": "#484f5850",
    "scrollbarSlider.hoverBackground": "#484f5870",
    "scrollbarSlider.activeBackground": "#484f5890",
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
    { token: "function", foreground: "0891b2" },
    { token: "variable", foreground: "1e293b" },
    { token: "operator", foreground: "e11d48" },
    { token: "predefined", foreground: "db2777" },
  ],
  colors: {
    "editor.background": "#f8fafc",
    "editor.foreground": "#1e293b",
    "editorCursor.foreground": "#10B981",
    "editorLineNumber.foreground": "#cbd5e1",
    "editorLineNumber.activeForeground": "#10B981",
    "editor.selectionBackground": "#10B98120",
    "editorIndentGuide.background": "#e2e8f0",
    "editorIndentGuide.activeBackground": "#10B98130",
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
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { theme } = useThemeStore();

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    editor.focus();
  }, []);

  const handleChange: OnChange = useCallback((val) => {
    if (val !== undefined) onChangeRef.current(val);
  }, []);

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
