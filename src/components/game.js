import React, { useState } from "react";
import { get_winner } from "./winner";
import Board from "./board";

const Game = () => {

  const [ historyOfMoves, setHistoryOfMoves ] = useState([ null, null, null, null, null, null, null, null, null ]);
  const [ stepNumber, setStepNumber ] = useState(-1);
  const [ showHistory, setShowHistory ] = useState(false);


  const getStatusOfBoard = () => {
    let boardStatus = [ null, null, null, null, null, null, null, null, null ];

    for (let i = 0; i <= stepNumber; i++) {
      i % 2 !== 0
        ? (boardStatus[ historyOfMoves[ i ] ] = "O")
        : (boardStatus[ historyOfMoves[ i ] ] = "X");
    }

    return boardStatus;
  };

  const winner = get_winner(getStatusOfBoard());
  const player_turn = stepNumber % 2 ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = historyOfMoves.slice(0, stepNumber + 1);
    const moveInHistory = historyPoint.indexOf(i);

    if (winner || moveInHistory !== -1) return;

    var copyOfHistoryMoves = historyOfMoves;
    copyOfHistoryMoves[ stepNumber + 1 ] = i;

    for (let index = stepNumber + 2; index < 9; index++) {
      copyOfHistoryMoves[ index ] = null;
    }

    setHistoryOfMoves(copyOfHistoryMoves);
    setStepNumber(stepNumber + 1);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
  };

  const renderMoves = () =>
    historyOfMoves
      .filter((value) => value != null)
      .map((value, idx) => {
        return (
          <button
            className="gaDropdownList"
            key={idx}
            onClick={() => jumpTo(idx)}
          >
            Move #{idx + 1}
          </button>
        );
      });
  return (
    <div className="gaBoardAndHistory">
      <div className="gaInfoWrapper">
        <div className="gaDropdown">
          <span
            className="gaHistoryHead"
            onClick={() => setShowHistory((showHistory) => !showHistory)}
          >
            Moves
            </span>
          {showHistory && (
            <div className="gaDropdownContent">{renderMoves()}</div>
          )}
        </div>
      </div>
      <div className="gaBoardAndHeader">
        <div className="gaAppHead">Tic Tac Toe </div>
        <Board squares={getStatusOfBoard()} onClick={handleClick} />
        <div className="gaResultHead">
          {winner ? (
            <span className="gaGameStatus">Winner: {winner}</span>
          ) : stepNumber !== 8 ? (
            "Next Player: " + player_turn
          ) : (
            <span className="gaGameStatus">Game Ends in a Draw</span>
          )}
        </div>
        <div className="gaResetButtonDiv">
          <button className="gaResetBtn" onClick={() => jumpTo(-1)}>
            Reset
            </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
