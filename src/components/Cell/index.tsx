import React from "react";

import { ReactComponent as CrossIcon } from "./cross.svg";
import { ReactComponent as CircleIcon } from "./circle.svg";
import { TURN } from "../GameBoard";
import styles from "./Cell.module.css";

interface CellProps {
  onClick: (position: number) => void;
  value: TURN | null;
  position: number;
  isClickable?: boolean;
}

export const Cell: React.FC<CellProps> = ({
  isClickable,
  onClick,
  position,
  value,
}) => {
  return (
    <div
      className={styles.cell}
      onClick={() => {
        isClickable && onClick(position);
      }}
    >
      {value && (value === TURN.CIRCLE ? <CircleIcon /> : <CrossIcon />)}
    </div>
  );
};
