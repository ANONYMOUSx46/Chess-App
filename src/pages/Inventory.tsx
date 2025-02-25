// src/pages/Inventory.tsx
import React from "react";
import { useGameStore } from "@/store/gameStore";

const Inventory = () => {
  const { silverPieces, activeSkin } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>
      <p className="text-lg text-gray-700 mb-8">
        You have {silverPieces} Silver Pieces
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">Active Skin</h2>
        <p className="text-gray-500 mt-2">{activeSkin}</p>
      </div>
    </div>
  );
};

export default Inventory;