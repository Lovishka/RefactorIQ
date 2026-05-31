import React from 'react';
import { DiffEditor } from '@monaco-editor/react';

export default function DiffView({ originalCode, modifiedCode }) {
  return (
    <div style={{ padding: '20px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ margin: '0 0 15px 0', fontFamily: 'sans-serif', color: '#1e293b' }}>
        🛠️ Review AI Architectural Refactor Patch
      </h3>
      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
        <DiffEditor
          height="300px"
          language="javascript"
          original={originalCode}
          modified={modifiedCode}
          theme="vs-dark"
          options={{
            renderSideBySide: true,
            readOnly: true,
            fontSize: 14,
            minimap: { enabled: false }
          }}
        />
      </div>
    </div>
  );
}