import React, { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import useComponentSize from "@rehooks/component-size";
import cardData from "./data.json";
import uuid from "uuid";
import { Card } from "./Card";
import { AddButton } from "./AddButton";
import { Summary } from "./Summary";
import { AddModal } from "./AddModal";

function positionCards(cards, width, height) {
  Object.values(cards).forEach(
    card =>
      (card.position = {
        left: card.offset.x + width * 0.5,
        top: card.offset.y + height * 0.5
      })
  );
}

function parseData() {
  const cards = {};

  cardData.forEach(task => {
    cards[task.id] = task;
  });

  return cards;
}

function addCard(cards, label) {
  const id = uuid.v4();

  cards[id] = {
    id,
    label,
    offset: {
      x: 0,
      y: 0
    }
  };
}

function App() {
  const [cards, setCards] = useState({});
  const [dragCardInfo, setDragCardInfo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const boardRef = useRef(null);
  const boardSize = useComponentSize(boardRef);
  const { height, width } = boardSize;

  useEffect(() => {
    if (height && width) {
      const parsedCards = parseData();
      positionCards(parsedCards, width, height);
      setCards({ ...parsedCards });
    }
  }, [height, width]);

  function handleDelete(card) {
    delete cards[card.id];
    setCards({ ...cards });
  }

  const cardEls = Object.values(cards).map(card => (
    <Card
      card={card}
      boardSize={boardSize}
      key={card.id}
      onDragStart={dragOffset => setDragCardInfo({ card, dragOffset })}
      onDragEnd={() => setDragCardInfo(null)}
      onDoubleClick={() => handleDelete(card)}
    />
  ));

  return (
    <div
      className="App"
      ref={boardRef}
      onMouseMove={ev => {
        if (!dragCardInfo) {
          return;
        }

        const { card, dragOffset } = dragCardInfo;

        card.position = {
          top: ev.pageY - dragOffset.y,
          left: ev.pageX - dragOffset.x
        };

        setCards({ ...cards });
      }}
    >
      {cardEls}
      <Summary cards={cards} />
      <AddButton onClick={() => setIsAddOpen(true)} />
      {isAddOpen && (
        <AddModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={cardText => {
            addCard(cards, cardText);
            positionCards(cards, width, height);
            setCards(cards);
          }}
        />
      )}
    </div>
  );
}

export default App;
