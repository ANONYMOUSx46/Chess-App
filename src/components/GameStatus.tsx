
import React from "react";
import { Chess } from "chess.js";

interface GameStatusProps {
  game: Chess;
  isThinking?: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ game, isThinking }) => {
  const getStatusText = () => {
    if (game.isCheckmate()) {
      return `Checkmate! ${game.turn() === "w" ? "Black" : "White"} wins!`;
    }
    if (game.isDraw()) {
      return "Draw!";
    }
    if (game.isStalemate()) {
      return "Stalemate!";
    }
    if (game.isThreefoldRepetition()) {
      return "Draw by repetition!";
    }
    if (game.isInsufficientMaterial()) {
      return "Draw by insufficient material!";
    }
    return `${game.turn() === "w" ? "White" : "Black"} to move${isThinking ? " (thinking...)" : ""}`;
  };

  return (
    <div className="text-lg font-semibold text-gray-700">
      {getStatusText()}
    </div>
  );
};

export default GameStatus;
