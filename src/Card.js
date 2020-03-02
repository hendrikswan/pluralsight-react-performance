import React from "react";

export class Card extends React.Component {
  render() {
    const { card, onDragStart, onDragEnd, onDoubleClick } = this.props;

    return (
      <div
        onMouseDown={ev => {
          const clickOffset = {
            x: ev.clientX - parseFloat(ev.currentTarget.style.left),
            y: ev.clientY - parseFloat(ev.currentTarget.style.top)
          };
          onDragStart(clickOffset);
        }}
        onMouseUp={onDragEnd}
        onDoubleClick={onDoubleClick}
        style={{
          position: "absolute",
          left: card.position.left,
          top: card.position.top,
          backgroundColor: "#fff",
          padding: "25px",
          cursor: "move",
          userSelect: "none"
        }}
        key={card.id}
      >
        {card.label}
      </div>
    );
  }
}
