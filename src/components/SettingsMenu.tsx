// src/components/SettingsMenu.tsx
import React, { useState } from "react";
import { useGameStore } from "@/store/gameStore";

const SettingsMenu = () => {
  const { activeSkin, setActiveSkin, activeTheme, setActiveTheme } =
    useGameStore();

  // Example skins and themes (replace with actual data)
  const availableSkins = ["classic", "golden", "crystal"];
  const availableThemes = ["classic", "emerald", "coral"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-bold">Settings</h2>

      {/* Profile Settings */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Skin Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Skin
        </label>
        <select
          value={activeSkin}
          onChange={(e) => setActiveSkin(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {availableSkins.map((skin) => (
            <option key={skin} value={skin}>
              {skin.charAt(0).toUpperCase() + skin.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Theme
        </label>
        <select
          value={activeTheme}
          onChange={(e) => setActiveTheme(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {availableThemes.map((theme) => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsMenu;