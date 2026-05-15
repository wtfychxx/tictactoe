"use client";

import React from "react";
import { useTicTacToe } from "./hooks/useTicTacToe";
import { GameMode } from "./utils/gameLogic";

export default function TicTacToePage() {
  const { board, currentPlayer, winner, mode, setMode, makeMove, reset } =
    useTicTacToe();

  // Status Badge Helper
  const getStatusMessage = () => {
    if (winner === "DRAW") return "Seri! 🤝";
    if (winner) return `Pemenang: ${winner} 🎉`;
    return `Giliran: ${currentPlayer}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600">
            TicTacToe{" "}
            <span className="text-slate-400 text-2xl font-light">Pro</span>
          </h1>
          <p className="text-slate-500">Tantang Bot atau temanmu!</p>
        </header>

        {/* Mode Selector */}
        <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {(["2P", "EASY", "MEDIUM", "HARD"] as GameMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                reset();
                setMode(m);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === m
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Status Display */}
        <div className="text-center">
          <span
            className={`inline-block px-6 py-2 rounded-full text-lg font-semibold transition-all ${
              winner
                ? "bg-green-100 text-green-700 scale-110"
                : "bg-white text-slate-700 border border-slate-100"
            }`}
          >
            {getStatusMessage()}
          </span>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/60 aspect-square">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => makeMove(i)}
              disabled={!!cell || !!winner}
              // className="w-full h-full aspect-square text-3xl sm:text-4xl font-black rounded-xl bg-gray-50 border-2 border-gray-100 hover:border-indigo-300 transition-all flex items-center justify-center disabled:cursor-default shadow-sm active:scale-95 overflow-hidden hover:cursor-pointer"
              className={`
                aspect-square relative flex items-center justify-center text-4xl font-black rounded-2xl transition-all duration-200
                ${!cell && !winner ? "hover:bg-slate-50 active:scale-95 cursor-pointer" : "cursor-default"}
                ${cell === "X" ? "text-indigo-500" : "text-rose-500"}
                bg-slate-100 border-2 border-transparent focus:outline-none focus:border-indigo-300
              `}
            >
              <span
                className={
                  cell ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }
              >
                {cell}
              </span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="group flex items-center gap-2 px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-500 transition-all active:scale-95 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Restart Game
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-12 text-slate-400 text-sm">
        Built with Next.js & TypeScript
      </footer>
    </div>
  );
}
