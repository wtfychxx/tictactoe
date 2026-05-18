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

// Fungsi pembantu untuk mencari langkah kemenangan atau blokir
function findWinningOrBlockingMove(
  squares: Player[],
  playerToCheck: "X" | "O",
): number | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const vals = [squares[a], squares[b], squares[c]];
    // Cari kombinasi yang sudah terisi 2 oleh pemain yang dicek dan 1 masih kosong
    const count = vals.filter((val) => val === playerToCheck).length;
    const nullIndex = vals.indexOf(null);

    if (count === 2 && nullIndex !== -1) {
      // Kembalikan indeks papan yang sebenarnya (0-8)
      return [a, b, c][nullIndex];
    }
  }
  return null;
}

export function getBotMove(squares: Player[], mode: GameMode): number {
  const moves = getAvailableMoves(squares);

  if (mode === "EASY") {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // 2. MEDIUM MODE: Pintar tapi masih bisa teledor jika tidak ada ancaman langsung
  if (mode === "MEDIUM") {
    // A. Coba cari langkah untuk MENANG langsung
    const winMove = findWinningOrBlockingMove(squares, "O");
    if (winMove !== null) return winMove;

    // B. Coba cari langkah untuk BLOKIR lawan
    const blockMove = findWinningOrBlockingMove(squares, "X");
    if (blockMove !== null) return blockMove;

    // C. Jika aman, lakukan kombinasi acak cerdas (misal: ambil tengah atau acak)
    // if (squares[4] === null) return 4; // Ambil tengah jika kosong karena ini posisi strategis
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
