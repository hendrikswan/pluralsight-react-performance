import React, { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";
import "./App.css";
import useComponentSize from "@rehooks/component-size";
import cardData from "./data.json";
import uuid from "uuid";
import { Card } from "./Card";
import { AddButton } from "./AddButton";
import { Summary } from "./Summary";

const AddModal  = lazy(() => import('./AddModal'));


const ModalLoader = () => <div className="Modal-Loader">Loading</div>;



function positionCards(cards, width, height) {
  const updatedCards = {};

  Object.values(cards).forEach(
    card =>
      (updatedCards[card.id] = {
        ...card,
        position: {
          left: card.offset.x + width * 0.5,
          top: card.offset.y + height * 0.5
        }
      })
  );

  return updatedCards;
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

  return {
    ...cards,
    [id]: {
      id,
      label,
      offset: {
        x: 0,
        y: 0
      }
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

  const showDialog = useCallback(() => setIsAddOpen(true), []);

  useEffect(() => {
    if (height && width) {
      const parsedCards = parseData();
      setCards(positionCards(parsedCards, width, height));
    }
  }, [height, width]);

  function handleDelete(card) {
    const clonedCards = { ...cards };
    delete clonedCards[card.id];

    setCards(clonedCards);
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

        const updatedCards = {
          ...cards,
          [card.id]: {
            ...card,
            position: {
              top: ev.pageY - dragOffset.y,
              left: ev.pageX - dragOffset.x
            }
          }
        };

        setCards(updatedCards);
      }}
    >
      {cardEls}
      <Summary cards={cards} />
      <AddButton onClick={showDialog} />
      {isAddOpen && (
        <Suspense fallback={<ModalLoader />}>
          <AddModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onAdd={cardText => {
              const updatedCards = positionCards(
                addCard(cards, cardText),
                width,
                height
              );
              setCards(updatedCards);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
