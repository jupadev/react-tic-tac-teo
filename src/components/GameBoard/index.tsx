import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import { Cell } from "../Cell";
import styles from "./GameBoard.module.css";

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
  const [hasWinner, setHasWinner] = useState("");

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
        setHasWinner("Circle Win");
        return true;
      }

      const crossWin = group.every((index) => cells[index] === TURN.CROSS);
      if (crossWin) {
        setHasWinner("Cross Win");
        return true;
      }
    });
  }, [cells]);

  const onRestartHandler = () => {
    setHasWinner("");
    setCells([null, null, null, null, null, null, null, null, null]);
  };

  return (
    <>
      <div className={styles.gameboard}>
        {cells.map((value, index) => (
          <Cell
            key={index}
            onClick={onCLickHandler}
            value={value}
            position={index}
            isClickable={!Boolean(value) && !Boolean(hasWinner)}
          />
        ))}
      </div>
      <p className={styles.message}>{hasWinner || `Turn: ${turn}`}</p>
      <Confetti
        width={900}
        height={500}
        numberOfPieces={200}
        hidden={!Boolean(hasWinner)}
        style={{
          margin: "0 auto",
        }}
      />
      {Boolean(hasWinner) && (
        <div style={{ marginTop: 150 }}>
          <button className={styles.button} onClick={onRestartHandler}>
            ↻ Restart
          </button>
        </div>
      )}
    </>
  );
};
