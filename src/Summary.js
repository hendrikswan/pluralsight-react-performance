import React, { useState, useMemo } from "react";
import levenshtein from "levenshtein";
import "./Summary.css";
import { CornerButton } from "./CornerButton";

export const Summary = React.memo(
  function Summary(props) {
    const [position, setPosition] = useState("top-right");

    const cards = Object.values(props.cards);

    console.time("calc-distances");
    const distances = useMemo(() => {
      const distanceCals = { max: 0, min: 100000 };
      cards.forEach(currentCard => {
        cards.forEach(compareCard => {
          if (compareCard === currentCard) {
            return;
          }
          const distance = levenshtein(currentCard.label, compareCard.label);

          distanceCals.max = Math.max(distanceCals.max, distance);
          distanceCals.min = Math.min(distanceCals.min, distance);
        });
      });
      return distanceCals;
    }, [Object.keys(props.cards).length]);

    console.timeEnd("calc-distances");

    return (
      <div className={`Summary Summary-${position}`}>
        <div>You have {Object.keys(props.cards).length} cards!</div>
        <div>Max difference in labels: {distances.max}</div>
        <div>Min difference in labels: {distances.min}</div>

        <CornerButton
          setPosition={setPosition}
          corner="top-right"
          position={position}
        />
        <CornerButton
          setPosition={setPosition}
          corner="top-left"
          position={position}
        />
        <CornerButton
          setPosition={setPosition}
          corner="bottom-left"
          position={position}
        />
        <CornerButton
          setPosition={setPosition}
          corner="bottom-right"
          position={position}
        />
      </div>
    );
  },
  (prevProps, newProps) =>
    Object.values(prevProps.cards).length ===
    Object.values(newProps.cards).length
);
