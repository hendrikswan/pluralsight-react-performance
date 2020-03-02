import React, { useState } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";

Modal.setAppElement("#root");

export function AddModal({ isOpen, onAdd, onClose }) {
  const [cardText, setCardText] = useState("");
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
  }

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "250px",
          height: "300px"
        }
      }}
      contentLabel="Example Modal"
    >
      {isDone && (
        <div>
          <Confetti width={500} height={500} />
          <h2>
            Done{" "}
            <span role="img" aria-label="check">
              ✅
            </span>
          </h2>
          <button
            style={{
              marginTop: 25,
              backgroundColor: "#333",
              color: "#fff",
              padding: 8,
              width: "100%",
              textAlign: "center",
              fontSize: 18
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}

      {!isDone && (
        <>
          <h2>Add a new card</h2>

          <div
            style={{
              fontSize: 14,
              fontWeight: 700
            }}
          >
            Card text
          </div>
          <input
            style={{
              border: "1px solid #333",
              width: "100%",
              margin: "0 auto",
              fontSize: 17,
              padding: 4,
              marginTop: 5
            }}
            value={cardText}
            onChange={ev => setCardText(ev.currentTarget.value)}
          />

          <button
            style={{
              marginTop: 25,
              backgroundColor: "#333",
              color: "#fff",
              padding: 8,
              width: "100%",
              textAlign: "center",
              fontSize: 18
            }}
            onClick={() => {
              onAdd(cardText);
              setIsDone(true);
            }}
          >
            Add
          </button>
        </>
      )}
    </Modal>
  );
}
