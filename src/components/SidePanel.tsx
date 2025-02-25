// src/components/SidePanel.tsx
import React from "react";
import { Link } from "react-router-dom";

const SidePanel = () => {
  return (
    <div className="fixed top-0 right-0 h-screen w-64 bg-gray-800 text-white p-4 shadow-lg z-40">
      {/* Header */}
      <h2 className="text-lg font-bold mb-6 text-center">Game Menu</h2>

      {/* Navigation Buttons */}
      <div className="space-y-4">
        {/* Shop Button */}
        <Link
          to="/shop"
          className="block w-full bg-blue-500 py-2 rounded text-center transition-colors hover:bg-blue-600"
        >
          Shop
        </Link>

        {/* Inventory Button */}
        <Link
          to="/inventory"
          className="block w-full bg-green-500 py-2 rounded text-center transition-colors hover:bg-green-600"
        >
          Inventory
        </Link>

        {/* Missions Button */}
        <Link
          to="/missions"
          className="block w-full bg-yellow-500 py-2 rounded text-center transition-colors hover:bg-yellow-600"
        >
          Missions
        </Link>
      </div>

      {/* Additional Features (Optional) */}
      <div className="mt-8 space-y-4">
        <button
          className="block w-full bg-red-500 py-2 rounded text-center transition-colors hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidePanel;