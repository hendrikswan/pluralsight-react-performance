import React from "react";

export function CornerButton({ corner, setPosition, position }) {
  return (
    <div onClick={() => setPosition(corner)} className={`arrow arrow-${corner} ${position === corner ? 'arrow-active' : ''}`} />
  );
}
