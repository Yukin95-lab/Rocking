import React, { useState, useRef, useEffect } from "react";
import ForceGraph2D from 'react-force-graph-2d';

// Liste des pas de danse (nœuds)
const nodes = [
  "Nuque", "Passage sous le bras", "Noeud", "Corbeille", "Double tourné", "Normal",
  "Cendri", "coiffe", "Coucou", "Tombé hanche - > Tombé dos", "Double tour main épaule", "tombé dos",
  "Flashdance", "bras croisés", "Araignée", "Indécis", "tour accroupi", "double bras croisés",
  "Tombé hanche", "Macarena", "Coucou inversé", "tomber cabas", "Tap tap", "enroulé", "double enroulé",
  "Chevalier", "Spock", "Tout", "Bras croisés"
].map((id) => ({ id }));

// Transitions entre les pas (liens)
const links = [
  { source: "Nuque", target: "Passage sous le bras" },
  { source: "Noeud", target: "Corbeille" },
  { source: "Double tourné", target: "Normal" },
  { source: "Cendri", target: "coiffe" },
  { source: "Coucou", target: "Tombé hanche - > Tombé dos" },
  { source: "Double tour main épaule", target: "tombé dos" },
  { source: "Flashdance", target: "bras croisés" },
  { source: "Araignée", target: "bras croisés" },
  { source: "Indécis", target: "tour accroupi" },
  { source: "tour accroupi", target: "double bras croisés" },
  { source: "Tombé hanche", target: "tombé dos" },
  { source: "Macarena", target: "Coucou inversé" },
  { source: "Coucou inversé", target: "tomber cabas" },
  { source: "Tap tap", target: "enroulé" },
  { source: "enroulé", target: "double enroulé" },
  { source: "Normal", target: "Bras croisés" },
  { source: "Tout", target: "Normal" },
  { source: "Bras croisés", target: "Normal" },
  { source: "Bras croisés", target: "double bras croisés" }
];

export default function DanceGraph() {
  const [highlightNode, setHighlightNode] = useState(null);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#fff", position: "relative" }}>
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeAutoColorBy="id"
        nodeLabel={null} // on va gérer l'affichage manuellement
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkWidth={2}
        linkColor={() => "#444"}
        backgroundColor="#ffffff"
        onNodeClick={(node) => setHighlightNode(node.id)}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';

          // Draw the text label
          ctx.fillText(label, node.x, node.y + 14);

          // Draw a larger node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#888';
          ctx.fill();
        }}
      />
      {highlightNode && (
        <div style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}>
          <strong>Pas sélectionné :</strong> {highlightNode}
        </div>
      )}
    </div>
  );
}
