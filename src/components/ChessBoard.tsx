// src/components/ChessBoard.tsx
import React, { useState } from "react";
import { Chess, Square } from "chess.js";
import ChessPiece from "./ChessPiece";
import { cn } from "@/lib/utils";

interface ChessBoardProps {
  game: Chess;
  onMove: (from: Square, to: Square) => void;
  activeSkin?: string; // Add activeSkin as an optional prop
}

const ChessBoard: React.FC<ChessBoardProps> = ({ game, onMove, activeSkin }) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);

  // Handle square click logic
  const handleSquareClick = (square: Square) => {
    if (!selectedSquare) {
      // Select a piece and highlight possible moves
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelectedSquare(square);
        setPossibleMoves(moves.map((move) => move.to as Square));
      }
    } else if (possibleMoves.includes(square)) {
      // Move the piece to the selected square
      onMove(selectedSquare, square);
      setSelectedSquare(null);
      setPossibleMoves([]);
    } else {
      // Deselect the current square
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  // Ranks and files for the chessboard
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <div className="w-full max-w-2xl aspect-square">
      <div className="grid grid-cols-8 h-full w-full rounded-lg overflow-hidden shadow-xl">
        {ranks.map((rank) =>
          files.map((file) => {
            const square = `${file}${rank}` as Square;
            const isLight = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
            const piece = game.get(square);
            const isSelected = selectedSquare === square;
            const isPossibleMove = possibleMoves.includes(square);

            return (
              <div
                key={square}
                className={cn(
                  "w-full h-full flex items-center justify-center transition-all duration-200 relative",
                  isLight ? "bg-gray-200" : "bg-gray-700",
                  isSelected && "bg-yellow-400",
                  isPossibleMove && "bg-green-500 hover:bg-green-600"
                )}
                onClick={() => handleSquareClick(square)}
              >
                {/* Render the chess piece if it exists */}
                {piece && (
                  <ChessPiece
                    type={piece.type}
                    color={piece.color as "w" | "b"}
                    isSelected={isSelected}
                    skinId={activeSkin} // Pass activeSkin to ChessPiece
                  />
                )}

                {/* Highlight possible moves with a small circle */}
                {isPossibleMove && !piece && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full opacity-70"></div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChessBoard;