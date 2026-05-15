// app/utils/gameLogic.ts

export type Player = "X" | "O" | null;
export type GameStatus = Player | "DRAW";
export type GameMode = "2P" | "EASY" | "MEDIUM" | "HARD";

export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares: Player[]): GameStatus {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.includes(null) ? null : "DRAW";
}

export function getAvailableMoves(squares: Player[]): number[] {
  return squares.map((sq, i) => (sq === null ? i : -1)).filter((i) => i !== -1);
}

// Algoritma Minimax untuk tingkat kesulitan HARD
function minimax(
  squares: Player[],
  depth: number,
  isMaximizing: boolean,
): number {
  const result = calculateWinner(squares);
  if (result === "O") return 10 - depth; // Bot menang
  if (result === "X") return depth - 10; // Pemain menang
  if (result === "DRAW") return 0;

  const moves = getAvailableMoves(squares);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of moves) {
      squares[move] = "O";
      bestScore = Math.max(bestScore, minimax(squares, depth + 1, false));
      squares[move] = null;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of moves) {
      squares[move] = "X";
      bestScore = Math.min(bestScore, minimax(squares, depth + 1, true));
      squares[move] = null;
    }
    return bestScore;
  }
}

export function getBotMove(squares: Player[], mode: GameMode): number {
  const moves = getAvailableMoves(squares);

  if (mode === "EASY") {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (mode === "MEDIUM" && Math.random() > 0.5) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // HARD MODE: Mencari langkah terbaik menggunakan Minimax
  let bestScore = -Infinity;
  let move = moves[0];
  for (const m of moves) {
    squares[m] = "O";
    const score = minimax(squares, 0, false);
    squares[m] = null;
    if (score > bestScore) {
      bestScore = score;
      move = m;
    }
  }
  return move;
}
