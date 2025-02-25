// src/savedGames.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveGame = async (userId, gameId, gameState) => {
  const gameRef = doc(db, "users", userId, "savedGames", gameId);
  await setDoc(gameRef, { ...gameState, savedAt: new Date().toISOString() });
};

export const loadGame = async (userId, gameId) => {
  const gameRef = doc(db, "users", userId, "savedGames", gameId);
  const gameSnap = await getDoc(gameRef);
  return gameSnap.exists() ? gameSnap.data() : null;
};