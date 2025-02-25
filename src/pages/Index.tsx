// src/pages/Index.tsx
import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import ChessBoard from "@/components/ChessBoard";
import GameStatus from "@/components/GameStatus";
import SettingsMenu from "@/components/SettingsMenu"; // New: Settings Menu
import SidePanel from "@/components/SidePanel"; // New: Shop, Inventory, Missions
import SignIn from "./SignIn"; // Import SignIn component
import { toast } from "sonner";
import { useGameStore } from "@/store/gameStore";
import { Star } from "lucide-react";
import Confetti from "react-confetti";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Index = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [isThinking, setIsThinking] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [gameId, setGameId] = useState(""); // For multiplayer game rooms
  const [user, setUser] = useState<any | null>(null); // Track user authentication state

  // Destructure Zustand store values
  const {
    silverPieces,
    addSilverPieces,
    updateMissionProgress,
    activeSkin,
  } = useGameStore();

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // If the user is not logged in, show the SignIn component
  if (!user) {
    return <SignIn />;
  }

  // Handle player moves
  const makeMove = (from: string, to: string) => {
    try {
      const newGame = new Chess(game.fen());
      const move = newGame.move({ from, to, promotion: "q" });
      if (move) {
        setGame(newGame);
        if (newGame.isGameOver()) {
          if (newGame.isCheckmate()) {
            const winner = newGame.turn() === "w" ? "Black" : "White";
            toast.success(`Checkmate! ${winner} wins!`);
            if (winner === "White") {
              const earnedStars = calculateStarRating(newGame);
              const reward = earnedStars * 50; // 50 SP per star
              addSilverPieces(reward);
              updateMissionProgress("win-1", 1);
              setStarRating(earnedStars);
              setShowRewardPopup(true); // Show reward popup
            }
          } else if (newGame.isDraw()) {
            toast.info("Game Over - Draw!");
          }
        } else if (newGame.isCheck()) {
          toast(`Check!`, {
            description: `${
              newGame.turn() === "w" ? "White" : "Black"
            } is in check!`,
          });
        }

        // Bot's turn
        if (!newGame.isGameOver() && newGame.turn() === "b") {
          setIsThinking(true);
          setTimeout(() => {
            const moves = newGame.moves();
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            newGame.move(randomMove);
            setGame(newGame);
            setIsThinking(false);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Invalid move:", error);
      toast.error("Invalid move!");
    }
  };

  // Reset the game
  const resetGame = () => {
    setGame(new Chess());
    setStarRating(0);
    setShowRewardPopup(false);
    toast.success("New game started!");
  };

  // Multiplayer: Create a game room
  const handleCreateGame = async () => {
    if (!user) {
      toast.error("You must be logged in to create a game room.");
      return;
    }
    const userId = user.uid; // Use actual user ID
    const newGameId = `GAME-${Date.now()}`; // Generate a unique ID
    await createGameRoom(newGameId, userId);
    setGameId(newGameId);
    toast.success(`Game room created: ${newGameId}`);
  };

  // Multiplayer: Join a game room
  const handleJoinGame = async () => {
    if (!user) {
      toast.error("You must be logged in to join a game room.");
      return;
    }
    const userId = user.uid; // Use actual user ID
    if (!gameId) {
      toast.error("Please enter a valid game ID.");
      return;
    }
    await joinGameRoom(gameId, userId);
    toast.success(`Joined game room: ${gameId}`);
  };

  // Saved Games: Save the current game state
  const handleSaveGame = async () => {
    if (!user) {
      toast.error("You must be logged in to save games.");
      return;
    }
    const gameState = game.fen();
    await saveGame(user.uid, gameId, gameState);
    toast.success("Game saved successfully!");
  };

  // Saved Games: Load a saved game state
  const handleLoadGame = async () => {
    if (!user) {
      toast.error("You must be logged in to load games.");
      return;
    }
    const savedState = await loadGame(user.uid, gameId);
    if (savedState) {
      const newGame = new Chess(savedState);
      setGame(newGame);
      toast.success("Game loaded successfully!");
    } else {
      toast.error("No saved game found.");
    }
  };

  return (
    <>
      {/* Reward Popup */}
      {showRewardPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/70 z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="text-lg">
              You earned {starRating} stars and {starRating * 50} SP!
            </p>
            <button
              onClick={() => setShowRewardPopup(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
        {/* Header with Silver Pieces Display */}
        <header className="w-full max-w-4xl flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chess vs Bot</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Silver Pieces:</span>
            <span className="text-xl font-bold">{silverPieces}</span>
          </div>
        </header>

        {/* Main Layout */}
        <div className="w-full max-w-4xl flex space-x-4">
          {/* Left Panel: Settings Menu and Side Panel */}
          <aside className="w-64 flex flex-col space-y-4">
            <SettingsMenu />
            <SidePanel />
          </aside>

          {/* Right Panel: Chess Board and Game Controls */}
          <div className="flex-1 flex flex-col items-center space-y-6">
            <GameStatus game={game} isThinking={isThinking} />
            <ChessBoard game={game} onMove={makeMove} activeSkin={activeSkin} />
            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                New Game
              </button>
              <button
                onClick={handleSaveGame}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Game
              </button>
              <button
                onClick={handleLoadGame}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Load Game
              </button>
            </div>

            {/* Multiplayer Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCreateGame}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Create Game Room
              </button>
              <input
                type="text"
                placeholder="Enter Game ID"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleJoinGame}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Join Game Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to calculate star rating
const calculateStarRating = (game: Chess): number => {
  const totalMoves = game.history().length;
  if (totalMoves <= 20) return 5; // Perfect game
  if (totalMoves <= 40) return 3; // Good game
  return 1; // Average game
};

export default Index;