// app/components/TicTacToe.tsx
import { type Player, type GameMode } from "../utils/gameLogic";
import { useTicTacToe } from "../hooks/useTicTacToe";

export function TicTacToe() {
  const { board, currentPlayer, winner, mode, setMode, makeMove, reset } =
    useTicTacToe();

  const statusText = winner
    ? winner === "DRAW"
      ? "Seri!"
      : `Pemenang: ${winner}`
    : `Giliran: ${currentPlayer}`;

  return (
    // max-w-sm memastikan di mobile tidak terlalu mepet ke pinggir layar
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 p-4 sm:p-8 bg-white rounded-2xl shadow-xl">
      {/* Container Mode: Menggunakan flex-wrap agar tombol tidak terpotong di layar kecil */}
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        {(["2P", "EASY", "MEDIUM", "HARD"] as GameMode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              reset();
            }}
            className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full transition-all ${
              mode === m
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="text-xl sm:text-2xl font-bold text-gray-700 h-8">
        {statusText}
      </div>

      {/* Grid: Menggunakan w-full agar mengikuti lebar container */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full aspect-square">
        {board.map((val, i) => (
          <button
            key={i}
            onClick={() => makeMove(i)}
            // Penjelasan class:
            // 1. aspect-square pada button memastikan setiap cell tetap kotak.
            // 2. flex & items-center memastikan X/O tepat di tengah tanpa menggeser layout.
            // 3. h-full w-full memastikan button mengisi jatah grid-nya.
            className="w-full h-full aspect-square text-3xl sm:text-4xl font-black rounded-xl bg-gray-50 border-2 border-gray-100 hover:border-indigo-300 transition-all flex items-center justify-center disabled:cursor-default shadow-sm active:scale-95 overflow-hidden hover:cursor-pointer"
            disabled={
              !!val || !!winner || (mode !== "2P" && currentPlayer === "O")
            }
          >
            <span className={val === "X" ? "text-indigo-600" : "text-rose-500"}>
              {val}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={reset}
        className="mt-4 w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-transform active:scale-95 shadow-lg hover:cursor-pointer"
      >
        Mulai Ulang Game
      </button>
    </div>
  );
}
