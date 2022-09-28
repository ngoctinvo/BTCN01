import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

const gameLines = {
  3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  5: [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ],
};

const calWinner = (squares) => {
  if (squares.every((square) => square.value)) return "NOPE";
  const lines = gameLines[Math.sqrt(squares.length)];
  if (Math.sqrt(squares.length) === 3) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a].value &&
        squares[a].value === squares[b].value &&
        squares[a].value === squares[c].value
      ) {
        squares[a].isCauseWin = true;
        squares[b].isCauseWin = true;
        squares[c].isCauseWin = true;
        return squares[a].value;
      }
    }
  }

  if (Math.sqrt(squares.length) === 5) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (
        squares[a].value &&
        squares[a].value === squares[b].value &&
        squares[a].value === squares[c].value &&
        squares[a].value === squares[d].value &&
        squares[a].value === squares[e].value
      ) {
        for (const index of lines[i]) {
          squares[index].isCauseWin = true;
        }
        return squares[a].value;
      }
    }
  }
  return null;
};

const createSquares = (size) => {
  const squares = [];
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      squares.push({
        value: null,
        row: i,
        col: j,
        isCauseWin: false,
      });

  return squares;
};

const App = () => {
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAsc, setIsAsc] = useState(true);
  const [size, setSize] = useState(3);
  const [history, setHistory] = useState([
    {
      squares: createSquares(3),
      step: 0,
      currentRow: null,
      currentCol: null,
    },
  ]);
  const onClickEvent = (i, row, col) => {
    const selectedStep = isAsc
      ? history.slice(0, step + 1)
      : [...history].reverse().slice(0, step + 1);

    const currentStep = selectedStep[selectedStep.length - 1];
    const selectedSquare = currentStep.squares.map((square) => ({ ...square }));

    if (calWinner(selectedSquare) || selectedSquare[i].value) {
      return;
    }

    if (!selectedSquare[i].value) {
      selectedSquare[i].value = xIsNext ? "X" : "O";
      setHistory(
        selectedStep.concat([
          {
            squares: selectedSquare,
            step: selectedStep.length,
            currentRow: row,
            currentCol: col,
          },
        ])
      );
      setStep(selectedStep.length);
      setXIsNext(!xIsNext);
    }
  };

  const jumpTo = (step) => {
    setStep(step);
    setXIsNext(step % 2 === 0);
  };
  const currentStep = history[isAsc ? step : history.length - step - 1];
  const winner = calWinner(currentStep.squares);
  let status;
  if (winner === "NOPE") status = "Kết thúc! X và O hòa nhau.";
  else if (winner) {
    status = "Kết thúc! Người chiến thắng: " + winner;
  } else {
    status = "Người chơi tiếp theo: " + (xIsNext ? "X" : "O");
  }
  useEffect(() => {
    setHistory([
      {
        squares: createSquares(size),
        step: 0,
        currentRow: null,
        currentCol: null,
      },
    ]);
    setStep(0);
    setXIsNext(true);
    setIsAsc(true);
  }, [size]);

  return (
    <div className="container">
      <div className="boardContainer">
        <Board
          current={currentStep}
          onClick={(i, row, col) => onClickEvent(i, row, col)}
          size={size}
        />
      </div>
      <div className="infoContainer">
        <div>
          <div>
            Chọn kích thước:
            <select
              name="size"
              onChange={(e) => {
                setSize(+e.target.value);
              }}
              style={{ width: "50px", height: "25px" }}
            >
              <option value="3"> 3 </option> <option value="5"> 5 </option>{" "}
            </select>
          </div>
          <span> Sắp xếp theo: </span>
          <button
            style={{
              width: "100px",
              height: "25px",
              border: "1px solid gray",
            }}
            onClick={() => {
              setIsAsc(!isAsc);
            }}
          >
            {isAsc ? "Tăng dần" : "Giảm dần"}
          </button>
          <div>
            <b> {status} </b>
          </div>
        </div>
        <div>
          <h3 style={{textAlign: "center"}}>Lịch sử</h3>
          <ul>
            {history
              .sort((h1, h2) => (isAsc ? h1.step - h2.step : h2.step - h1.step))
              .map((his, index) => {
                const desc = his.step
                  ? "Bước " +
                    `#${his.step} : ` +
                    ` (${his.currentCol}, ${his.currentRow})`
                  : "Bắt đầu";

                return (
                  <li key={his.step}>
                    <button
                      style={{
                        width: "300px",
                        height: "25px",
                        border: "1px solid gray",
                      }}
                      onClick={() => jumpTo(his.step)}
                      className={step === his.step ? "active" : ""}
                    >
                      {desc}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
