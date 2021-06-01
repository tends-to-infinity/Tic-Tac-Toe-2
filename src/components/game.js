import React, { useEffect, useState } from "react";
import { getWinner } from "./winner";
import Board from "./board";
import Button from "./button";

const Game = ({ location }) => {

  const squaresArray = Array(9).fill(null);
  const [ player1, setPlayer1 ] = useState("")
  const [ player2, setPlayer2 ] = useState("")
  const [ value, setValue ] = useState("")

  const [ historyOfMoves, setHistoryOfMoves ] = useState(squaresArray);
  const [ stepNumber, setStepNumber ] = useState(-1);
  const [ showHistory, setShowHistory ] = useState(false);

  const jumpTo = (step) => {
    setStepNumber(step);
  };

  useEffect(() => {
    let { player1, player2, value } = location.state.props;
    setValue(value)
    setPlayer1(player1)
    setPlayer2(player2)
  }, [ location ])

  let winner;

  useEffect(() => {
    if (winner || stepNumber === 8) {
      setTimeout(() => {
        jumpTo(-1)
      }, 2000)
    }
  }, [ winner, stepNumber ])

  const getStatusOfBoard = () => {
    let boardStatus = squaresArray;

    for (let step = 0; step <= stepNumber; step++) {
      step % 2 !== 0
        ? (boardStatus[ historyOfMoves[ step ] ] = value === "X" ? "O" : "X")
        : (boardStatus[ historyOfMoves[ step ] ] = value);
    }

    return boardStatus;
  };

  winner = getWinner(getStatusOfBoard(), value, player1, player2);
  const playerTurn = (stepNumber % 2 ? player1 : player2);

  const handleClick = (clicked) => {
    const historyPoint = historyOfMoves.slice(0, stepNumber + 1);
    const moveInHistory = historyPoint.indexOf(clicked);

    if (winner || moveInHistory !== -1) return;

    let copyOfHistoryMoves = historyOfMoves;
    copyOfHistoryMoves[ stepNumber + 1 ] = clicked;

    for (let index = stepNumber + 2; index < 9; index++) {
      copyOfHistoryMoves[ index ] = null;
    }

    setHistoryOfMoves(copyOfHistoryMoves);
    setStepNumber(stepNumber + 1);
  };

  const renderMoves = () =>
    historyOfMoves
      .filter((value) => value !== null)
      .map((value, moveNum) => {
        let val = "Move #" + (moveNum + 1);
        return (
          <Button
            key={moveNum}
            className="ga543DropdownList"
            value={val}
            onClick={() => jumpTo(moveNum)}
          />
        );
      });

  return (

    <div className="ga543BoardAndHistory">
      <div className="ga543InfoWrapper">
        <div className="ga543Dropdown">
          <span
            className="ga543HistoryHead"
            onClick={() => setShowHistory((showHistory) => !showHistory)}
          >
            Moves
            </span>
          {
            showHistory && (
              <div className="ga543DropdownContent">{renderMoves()}</div>
            )}
        </div>
      </div>
      <div className="ga543BoardAndHeader">
        <div className="ga543AppHead">Tic Tac Toe </div>
        <Board
          squares={getStatusOfBoard()}
          onClick={handleClick}
        />
        <div className="ga543ResultHead">
          {
            winner ? (
              <span className="ga543GameStatus">Winner: {winner}</span>
            ) : stepNumber !== 8 ? (
              "Next Player: " + playerTurn
            ) : (
              <span className="ga543GameStatus">Game Ends in a Draw</span>
            )}
        </div>
        <div className="ga543ResetButtonDiv">
          <Button
            className="ga543ResetBtn"
            value="Reset"
            onClick={() => jumpTo(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
