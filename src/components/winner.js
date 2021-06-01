import { lines } from "../utils/winnerLines";
export function getWinner(squares, value, player1, player2) {

  for (let line = 0; line < lines.length; line++) {
    const [ a, b, c ] = lines[ line ];
    if (squares[ a ] != null && squares[ a ] === squares[ b ] && squares[ a ] === squares[ c ]) {
      return (squares[ a ] === value ? player1 : player2);
    }
  }
  return null;
}
