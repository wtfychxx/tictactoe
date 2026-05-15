import { createFileRoute } from '@tanstack/react-router';
import { TicTacToe } from '../components/TicTacToe';

export const Route = createFileRoute('/')({
  component: () => (
    <main>
      <h1 className="pt-8 text-center text-3xl font-black text-gray-800 mb-8 uppercase tracking-widest">
        Tic Tac Toe TS
      </h1>
      <TicTacToe />
    </main>
  ),
});