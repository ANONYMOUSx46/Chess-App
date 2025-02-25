// src/multiplayer.js
import { ref, set, update, onValue } from "firebase/database";
import { realTimeDb } from "./firebase";

/**
 * Creates a new game room in the Realtime Database.
 * @param {string} gameId - The unique ID for the game room.
 * @param {string} userId - The ID of the user creating the game room.
 */
export const createGameRoom = async (gameId, userId) => {
  const gameRef = ref(realTimeDb, `games/${gameId}`);
  await set(gameRef, {
    players: [userId], // Initialize with the creator's user ID
    currentPlayer: userId, // First player starts the game
    moves: [], // Empty array for moves
    createdAt: new Date().toISOString(), // Timestamp for when the game was created
  });
};

/**
 * Joins an existing game room in the Realtime Database.
 * @param {string} gameId - The unique ID of the game room to join.
 * @param {string} userId - The ID of the user joining the game room.
 */
export const joinGameRoom = async (gameId, userId) => {
  const gameRef = ref(realTimeDb, `games/${gameId}`);
  await update(gameRef, {
    players: { [userId]: true }, // Add the user to the players list
  });
};

/**
 * Listens for updates to a specific game room in the Realtime Database.
 * @param {string} gameId - The unique ID of the game room to listen to.
 * @param {function} onUpdate - Callback function to handle updates.
 */
export const listenToGame = (gameId, onUpdate) => {
  const gameRef = ref(realTimeDb, `games/${gameId}`);
  return onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      onUpdate(data); // Pass the updated game data to the callback
    } else {
      console.warn(`Game room ${gameId} does not exist.`);
    }
  });
};

/**
 * Adds a move to the game room in the Realtime Database.
 * @param {string} gameId - The unique ID of the game room.
 * @param {object} move - The move object to add to the game room.
 */
export const makeMove = async (gameId, move) => {
  const gameRef = ref(realTimeDb, `games/${gameId}`);
  await update(gameRef, {
    moves: [...moves, move], // Add the move to the moves array
  });
};