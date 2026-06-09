import React from 'react';
import { Editor } from '@monaco-editor/react';

export default function DiffView({ originalCode, modifiedCode }) {
  const editorOptions = {
    readOnly: true,
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    lineNumbers: 'on',
    roundedSelection: false,
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    overviewRulerLanes: 0,
    renderValidationDecorations: 'off'
  };

  return (
    <div style={{ padding: '20px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}>
      <h3 style={{ margin: '0 0 15px 0', fontFamily: 'sans-serif', color: '#0f172a' }}>
        🛠️ Review AI Architectural Refactor Patch
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', minHeight: '360px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '10px 14px', borderRadius: '14px', background: '#fee2e2', color: '#991b1b', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>
            Original Code
          </div>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid #fecaca', background: '#fff1f2' }}>
            <Editor
              height="320px"
              language="javascript"
              value={originalCode}
              theme="vs-dark"
              options={editorOptions}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '10px 14px', borderRadius: '14px', background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>
            Updated Code
          </div>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
            <Editor
              height="320px"
              language="javascript"
              value={modifiedCode}
              theme="vs-dark"
              options={editorOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}