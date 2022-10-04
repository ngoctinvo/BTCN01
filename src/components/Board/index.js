import React from "react";
import Square from "../Square";
import styled, { css } from "styled-components";

const BoardRow = styled.div({
  width:"fit-content",
  height:"64px",
  "&::after": {
    clear: "both",
    content: "",
    display: "table",
  },
});
const BoardWrapper = styled.div({
  backgroundColor: "#ac466f",
  width: "fit-content",
  border: "2px solid #ac466f",
  borderRadius: "6px",
});

const Board = ({ current, onClick, size }) => {
  const { activeRow, activeCol, squares } = current;

  const renderSquare = (i) => {
    if (squares[i]) {
      const { row, col } = squares[i];
      return (
        <Square
          isActive={
            (activeCol === col && activeRow === row) || squares[i].isCauseWin
          }
          value={squares[i].value}
          onClick={() => onClick(i, row, col)}
          key={`square-${row}-${col}`}
        />
      );
    }
  };

  return (
    <BoardWrapper>
      {[...Array(size).keys()].map((row) => (
        <BoardRow key={`boardRow-${row}`}>
          {[...Array(size).keys()].map((col) => renderSquare(row * size + col))}
        </BoardRow>
      ))}
    </BoardWrapper>
  );
};

export default Board;
