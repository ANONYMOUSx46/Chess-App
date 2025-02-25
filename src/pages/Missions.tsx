// src/pages/Missions.tsx
import React from "react";
import { useGameStore } from "@/store/gameStore";
import { toast } from "sonner";

const Missions = () => {
  const { updateMissionProgress, silverPieces, addSilverPieces } =
    useGameStore();

  // Example mission list
  const missions = [
    {
      id: "win-1",
      name: "Win 1 Game",
      reward: 100,
      completed: false,
    },
    {
      id: "win-5",
      name: "Win 5 Games",
      reward: 500,
      completed: false,
    },
  ];

  // Handle completing a mission
  const handleCompleteMission = (missionId: string, reward: number) => {
    updateMissionProgress(missionId, 1);
    addSilverPieces(reward);
    toast.success(`Completed mission! Reward: ${reward} SP`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Missions</h1>
      <p className="text-lg text-gray-700 mb-8">
        You have {silverPieces} Silver Pieces
      </p>

      {/* List of missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-xl font-bold">{mission.name}</h2>
            <p className="text-gray-500 mt-2">Reward: {mission.reward} SP</p>
            <button
              onClick={() => handleCompleteMission(mission.id, mission.reward)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Complete Mission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;