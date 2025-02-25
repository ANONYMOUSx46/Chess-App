// src/pages/Shop.tsx
import React from "react";
import { useGameStore } from "@/store/gameStore";
import { toast } from "sonner";

const Shop = () => {
  // Destructure Zustand store values
  const { silverPieces, addSilverPieces, activeSkin, setActiveSkin } =
    useGameStore();

  // List of available skins with their costs
  const skins = [
    { id: "classic", name: "Classic Skin", cost: 100 },
    { id: "ancient", name: "Ancient Skin", cost: 200 },
    { id: "golden", name: "Golden Skin", cost: 300 },
  ];

  // Handle purchasing a skin
  const handlePurchase = (skinId: string, cost: number) => {
    if (silverPieces < cost) {
      toast.error("Not enough Silver Pieces!");
      return;
    }

    // Deduct the cost and set the new active skin
    addSilverPieces(-cost);
    setActiveSkin(skinId);
    toast.success(`Purchased ${skinId} skin!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <p className="text-lg text-gray-700 mb-8">
        You have {silverPieces} Silver Pieces
      </p>

      {/* List of skins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skins.map((skin) => (
          <div
            key={skin.id}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-xl font-bold">{skin.name}</h2>
            <p className="text-gray-500 mt-2">{skin.cost} SP</p>
            <button
              onClick={() => handlePurchase(skin.id, skin.cost)}
              className={`mt-4 px-4 py-2 rounded ${
                activeSkin === skin.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {activeSkin === skin.id ? "Equipped" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;