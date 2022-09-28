import React from "react";
import Square from "./Square";

const Board = ({ current, onClick, size }) => {
    const { activeRow, activeCol, squares } = current;

    const renderSquare = (i) => {
        if (squares[i]) {
            const { row, col } = squares[i];
            return (
                <Square
                    isActive={
                        (activeCol === col && activeRow === row) ||
                        squares[i].isCauseWin
                    }
                    square={squares[i]}
                    onClick={() => onClick(i, row, col)}
                    key={`square-${row}-${col}`}
                />
            );
        }
    };

    return (
        <div>
            {[...Array(size).keys()].map((row) => (
                <div className="boardRow" key={`boardRow-${row}`}>
                    {[...Array(size).keys()].map((col) =>
                        renderSquare(row * size + col)
                    )}
                </div>
            ))}
        </div>
    );
};

export default Board;
