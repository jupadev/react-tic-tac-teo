import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import styles from "./gameBoard.module.css";

export enum TURN {
  CIRCLE = "CIRCLE",
  CROSS = "CROSS",
}
export const GameBoard: React.FC = () => {
  const [cells, setCells] = useState<(TURN | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [turn, setTurn] = useState<TURN>(TURN.CIRCLE);

  const onCLickHandler = (position: number) => {
    setCells((state) => {
      const newState = state.map((value, index) => {
        if (position === index) {
          return turn;
        }
        return value;
      });
      return newState;
    });
    setTurn(turn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE);
  };

  useEffect(() => {
    const winnerGroups = [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagnal
      [0, 4, 8],
      [2, 4, 6],
    ];
    winnerGroups.some((group) => {
      const circleWin = group.every((index) => cells[index] === TURN.CIRCLE);
      if (circleWin) {
        alert("circle wins");
        return true;
      }

      const crossWin = group.every((index) => cells[index] === TURN.CROSS);
      if (crossWin) {
        alert("Cross wins");
        return true;
      }
    });
  }, [cells]);
  return (
    <div className={styles.gameboard}>
      {cells.map((value, index) => (
        <Cell
          key={index}
          onClick={onCLickHandler}
          value={value}
          position={index}
          isAlreadySet={Boolean(value)}
        />
      ))}
    </div>
  );
};
