import React, { useState } from "react";
import Button from "./button";
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';



const Login = () => {

  const [ player1, setPlayer1 ] = useState("");
  const [ player2, setPlayer2 ] = useState("");
  const [ value, setValue ] = useState("X");
  const history = useHistory()

  function SubmitForm(e) {
    e.preventDefault();
    if (player1 === "" || player2 === "") {
      <Redirect to="/" />
    } else {

      history.push({
        pathname: "/game",
        state: {
          props: {
            player1: player1,
            player2: player2,
            value: value
          }
        }
      })
    }
  }

  return (
    <div className="lo123ChoiceFormContainer">
      <form onSubmit={(e) => SubmitForm(e)} className="lo123ChoiceForm">
        <label className="lo123ChoiceFormLabel">Enter Player1:</label>
        <input
          className="lo123ChoiceFormInput"
          name='player1'
          type='text'
          value={player1}
          onChange={e => setPlayer1(e.target.value)}
        />
        <label className="lo123ChoiceFormLabel">Enter Player2:</label>
        <input
          className="lo123ChoiceFormInput"
          name='player2'
          type='text'
          value={player2}
          onChange={e => setPlayer2(e.target.value)}
        />
        <div className="lo123PlayerPrompt">
          <div className="lo123PromptHead">Hey {player1} , Make Your Choice to play Tic Tac Toe .</div>
          <div className="lo123ChoiceBtns">
            <div
              className="lo123PlayerBtn"
              onClick={() => {
                setValue("X");
              }}
            >X</div>
            <div
              className="lo123PlayerBtn"
              onClick={() => {
                setValue("0");
              }}
            >O</div>
          </div>
        </div>
        <Button type="submit" className="lo123ChoiceSubmitBtn" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
