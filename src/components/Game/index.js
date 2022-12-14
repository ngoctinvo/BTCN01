import React, { useEffect, useState } from "react";
import "../../App.css";
import Board from "../Board";
import styled from "styled-components";

const Container = styled.div({
  marginTop:"20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "30px",
  width:"100%",
  fontWeight: 700,
  fontSize: "16px",
});

const RestartButton = styled.button({
  position:"absolute",
  top: 0,
  right: "-100px",
  backgroundColor: "#fe95b7",
  fontWeight: 600,
  fontSize: "14px",
  height: "32px",
  border: "1px solid #fe608d",
  borderRadius: "4px",
  marginRight: "8px",
  "&:hover": {
    backgroundColor: "#ffbdd0",
    cursor: "pointer",
  },
});

const BoardContainer = styled.div({
   position:"relative",
   
});

const InfoContainer = styled.div({
  margiLeft: "20px",
  display: "flex",
  flexDirection: "row",
  gap: "80px",
});

const Controller = styled.div({
  borderRadius:"10px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  flexWrap:"nowrap",
  gap: "20px",
  alignItems: "start",
  border: "2px solid pink",
  height: "250px",
  width: "300px",
});

const SortSelection = styled.div({
  display: "flex",
  alignItems: "baseline",
  span: {
    marginRight: "10px",
    display: "block",
  }
});

const HistoryContent = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap:"wrap",
  alignItems: "start",
});

const Status = styled.div({
  height: "32px",
  color: "red",
});

const History = styled.div({
  borderRadius:"10px",
  border: "2px solid pink",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  flexWrap:"nowrap",
  alignItems: "start",
  minHeight: "250px",
  width: "500px",
});

const Title = styled.h3({
  margin: 0,
  fontSize: "32px",
  fontWeight: 700,
  color: "#b40779",
});

const Button = styled.button({
  backgroundColor: "#fe95b7",
  fontWeight: 600,
  fontSize: "14px",
  height: "24px",
  border: "1px solid #fe608d",
  borderRadius: "4px",
  marginRight: "8px",
  "&:hover": {
    backgroundColor: "#ffbdd0",
    cursor: "pointer",
  },
});

const SizeSelection = styled.div({
  select: {
    height: "24px",
    width: "60px",
    marginLeft: "8px"
  },
 
  
});
const Step = styled.div({
 margin:" 8px 0",
});


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

const Game = () => {
  const sizeList = [3,5];
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

  const clear = () => {
    jumpTo(0);
    setHistory([
      {
        squares: createSquares(size),
        step: 0,
        currentRow: null,
        currentCol: null,
      },
    ])
  }
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
  let isEnd = false;
  if (winner === "NOPE") {
    status = "K???t th??c! X v?? O h??a nhau.";
    isEnd  = true;
  }
  else if (winner) {
    status = "K???t th??c! Ng?????i chi???n th???ng: " + winner;
    isEnd  = true;

  } else {
    status = "Ng?????i ch??i ti???p theo: " + (xIsNext ? "X" : "O");
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
    <Container>
      <BoardContainer>
        <Board
          current={currentStep}
          onClick={(i, row, col) => onClickEvent(i, row, col)}
          size={size}
        />
       
        <RestartButton onClick={clear}>Ch??i l???i</RestartButton>
       
      </BoardContainer>
      <InfoContainer>
        <Controller>
          <Title>??i???u khi???n</Title>
          <SizeSelection>
            Ch???n k??ch th?????c:
            <select
              name="size"
              onChange={(e) => setSize(+e.target.value)}
            >
              {
                sizeList.map(size => (<option value={size}>{size}</option>))
              }
            </select>
          </SizeSelection>
          <SortSelection>            
            <span> S???p x???p theo: </span>
            <Button
              onClick={() => setIsAsc(!isAsc)}
            >
              {isAsc ? "T??ng d???n" : "Gi???m d???n"}
            </Button>
          </SortSelection>

          <Status>
            {status}
          </Status>
        </Controller>
        <History>
          <Title> L???ch s??? </Title>
          <HistoryContent>
            {history
              .sort((h1, h2) => (isAsc ? h1.step - h2.step : h2.step - h1.step))
              .map((his) => {
                const desc = his.step
                  ? "B?????c " +
                    `#${his.step} : ` +
                    ` (${his.currentCol}, ${his.currentRow})`
                  : "B???t ?????u";

                return (
                  <Step key={his.step}>
                    <Button
                      onClick={() => jumpTo(his.step)}
                      className={step === his.step ? "active" : ""}
                    >
                      {desc}
                    </Button>
                  </Step>
                );
              })}
          </HistoryContent>
        </History>
      </InfoContainer>
    </Container>
  );
};

export default Game;
