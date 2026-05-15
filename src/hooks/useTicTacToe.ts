// app/hooks/useTicTacToe.ts
import { useState, useEffect, useCallback } from "react";
import {
  type Player,
  type GameMode,
  calculateWinner,
  getBotMove,
  type GameStatus,
} from "../utils/gameLogic";

export function useTicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [mode, setMode] = useState<GameMode>("2P");

  const winner: GameStatus = calculateWinner(board);
  const currentPlayer: Player = xIsNext ? "X" : "O";

  const makeMove = useCallback(
    (index: number) => {
      if (board[index] || winner) return;

      setBoard((prev) => {
        const next = [...prev];
        next[index] = xIsNext ? "X" : "O";
        return next;
      });
      setXIsNext(!xIsNext);
    },
    [board, winner, xIsNext],
  );

  // Efek Otomatis untuk Bot (Player O)
  useEffect(() => {
    if (mode !== "2P" && !xIsNext && !winner) {
      const timer = setTimeout(() => {
        const botIndex = getBotMove([...board], mode);
        makeMove(botIndex);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, mode, winner, board, makeMove]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return { board, currentPlayer, winner, mode, setMode, makeMove, reset };
}
