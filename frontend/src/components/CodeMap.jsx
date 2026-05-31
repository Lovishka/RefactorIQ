import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function CodeMap({ customNodes, customEdges }) {
  // Fallback states logic
  const defaultNodes = [
    { id: '1', position: { x: 150, y: 80 }, data: { label: 'Paste GitHub link to build topology' }, style: { padding: '10px', background: '#e2e8f0', borderRadius: '6px' } }
  ];

  return (
    <div style={{ width: '100%', height: '250px', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden' }}>
      <ReactFlow 
        nodes={customNodes && customNodes.length > 0 ? customNodes : defaultNodes} 
        edges={customEdges || []} 
        fitView
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}