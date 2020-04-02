import React from "react";

export function CornerButton({ corner }) {
  // let position = {
  //   top: 0,
  //   left: 0
  // };
  //
  // if (corner === "top-right") {
  //   position = {
  //     top: 0,
  //     right: 0
  //   };
  // }
  //
  // if (corner === "bottom-left") {
  //   position = {
  //     bottom: 0,
  //     left: 0
  //   };
  // }
  //
  // if (corner === "bottom-right") {
  //   position = {
  //     bottom: 0,
  //     right: 0
  //   };
  // }

  return (
    <div className={`arrow arrow-${corner}`} />
  );
}
