import React from "react";

export class AddButton extends React.Component {
  render() {
    const { onClick } = this.props;

    return (
      <button
        onClick={onClick}
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          backgroundColor: "#333",
          position: "absolute",
          bottom: 100,
          right: 100,
          fontSize: 20,
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Add
      </button>
    );
  }
}
