import React from "react";
import { TURN } from "./GameBoard";

interface CellProps {
  onClick: (position: number) => void;
  value: TURN | null;
  position: number;
  isAlreadySet?: boolean;
}
export const Cell: React.FC<CellProps> = ({
  isAlreadySet,
  onClick,
  position,
  value,
}) => {
  return (
    <div
      style={{ width: 100, height: 100, border: "1px solid red" }}
      onClick={() => {
        !isAlreadySet && onClick(position);
      }}
    >
      {isAlreadySet}
      {value}
    </div>
  );
};
