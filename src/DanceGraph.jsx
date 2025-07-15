import React, { useState } from "react";

// Liste des pas de danse (nœuds)
const nodes = [
  "Nuque", "Passage sous le bras", "Noeud", "Corbeille", "Double tourné", "Normal",
  "Cendri", "coiffe", "Coucou", "Tombé hanche - > Tombé dos", "Double tour main épaule", "tombé dos",
  "Flashdance", "bras croisés", "Araignée", "Indécis", "tour accroupi", "double bras croisés",
  "Tombé hanche", "Macarena", "Coucou inversé", "tomber cabas", "Tap tap", "enroulé", "double enroulé",
  "Chevalier", "Spock", "Tout", "Bras croisés"
];

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
  const [selectedStep, setSelectedStep] = useState(null);

  const nextSteps = selectedStep
    ? links
        .filter(link => link.source === selectedStep)
        .map(link => link.target)
    : [];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#fff", minHeight: "100vh", color: "black" }}>
      {!selectedStep ? (
        <>
          <h2 style={{ color: "black" }}>Liste des pas de danse</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {nodes.map((step) => (
              <li key={step}>
                <button
                  onClick={() => setSelectedStep(step)}
                  style={{
                    padding: "10px 16px",
                    margin: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#f8f8f8",
                    cursor: "pointer",
                    color: "black" // Met en noir le texte des nodes
                  }}
                >
                  {step}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 style={{ color: "black" }}>Pas sélectionné : {selectedStep}</h2>
          {nextSteps.length > 0 ? (
            <>
              <p>Transitions possibles :</p>
              <ul>
                {nextSteps.map((next) => (
                  <li key={next}>
                    <strong>{selectedStep}</strong> → {next}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Aucune transition connue pour ce pas.</p>
          )}
          <button
            onClick={() => setSelectedStep(null)}
            style={{
              marginTop: "1rem",
              padding: "10px 16px",
              background: "#eee",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            Revenir à la liste
          </button>
        </>
      )}
    </div>
  );
}