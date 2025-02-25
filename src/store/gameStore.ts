import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firebase Firestore
import {
  GameState,
  PieceSkin,
  BoardTheme,
  Mission,
} from "../types/game";

// Define the GameStore interface
interface GameStore extends GameState {
  userId?: string; // Add a user ID field
  username?: string; // Add a username field
  addSilverPieces: (amount: number) => void;
  purchaseSkin: (skinId: string) => void;
  purchaseTheme: (themeId: string) => void;
  setActiveSkin: (skinId: string | null) => void;
  setActiveTheme: (themeId: string | null) => void;
  updateMissionProgress: (missionId: string, progress: number) => void;
  saveUserDataToFirebase: () => Promise<void>; // Save user data to Firestore
  loadUserDataFromFirebase: (userId: string) => Promise<void>; // Load user data from Firestore
}

// Initial missions
const initialMissions: Mission[] = [
  {
    id: "win-1",
    title: "First Victory",
    description: "Win your first game against the bot",
    reward: 100,
    completed: false,
    type: "win",
    requirement: 1,
    progress: 0,
  },
  // Add more missions here
];

// Available skins
const availableSkins: PieceSkin[] = [
  {
    id: "classic",
    name: "Classic",
    price: 0,
    rarity: "common",
    preview:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "golden",
    name: "Golden Royalty",
    price: 1000,
    rarity: "legendary",
    preview:
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "crystal",
    name: "Crystal Guardian",
    price: 750,
    rarity: "epic",
    preview:
      "https://images.unsplash.com/photo-1485262124878-4278bba3f11f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "neon",
    name: "Neon Warrior",
    price: 500,
    rarity: "rare",
    preview:
      "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "ancient",
    name: "Ancient Stone",
    price: 300,
    rarity: "rare",
    preview: "/pieces/ancient.png",
  },
  {
    id: "steampunk",
    name: "Steampunk Automaton",
    price: 850,
    rarity: "epic",
    preview: "/pieces/steampunk.png",
  },
];

// Available themes
const availableThemes: BoardTheme[] = [
  {
    id: "classic",
    name: "Classic Wood",
    price: 0,
    lightSquare: "#f0d9b5",
    darkSquare: "#b58863",
    preview:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "emerald",
    name: "Emerald Gardens",
    price: 500,
    lightSquare: "#eeeed2",
    darkSquare: "#769656",
    preview:
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "coral",
    name: "Coral Reef",
    price: 600,
    lightSquare: "#f7d9d9",
    darkSquare: "#c95d5d",
    preview:
      "https://images.unsplash.com/photo-1485262124878-4278bba3f11f?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "midnight",
    name: "Midnight Sky",
    price: 800,
    lightSquare: "#b8c0d2",
    darkSquare: "#4a5568",
    preview:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "desert",
    name: "Desert Sands",
    price: 400,
    lightSquare: "#f6e3c5",
    darkSquare: "#d4a373",
    preview:
      "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "arctic",
    name: "Arctic Frost",
    price: 700,
    lightSquare: "#e5e7eb",
    darkSquare: "#94a3b8",
    preview:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=60",
  },
];

// Create the Zustand store
export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      silverPieces: 0,
      ownedSkins: [availableSkins.find((skin) => skin.id === "classic")!], // Default skin
      ownedThemes: [availableThemes.find((theme) => theme.id === "classic")!], // Default theme
      activeSkin: "classic", // Default skin
      activeTheme: "classic", // Default theme
      missions: initialMissions,
      userId: undefined, // User ID (optional)
      username: undefined, // Username (optional)

      // Add silver pieces to the player's balance
      addSilverPieces: (amount: number) =>
        set((state) => ({ silverPieces: state.silverPieces + amount })),

      // Purchase a skin if the player has enough silver pieces
      purchaseSkin: (skinId: string) =>
        set((state) => {
          const skin = availableSkins.find((s) => s.id === skinId);
          if (!skin || state.silverPieces < skin.price) return state;

          // Ensure the skin isn't already owned
          if (state.ownedSkins.some((ownedSkin) => ownedSkin.id === skinId)) {
            console.warn(`Skin "${skin.name}" is already owned.`);
            return state;
          }

          return {
            silverPieces: state.silverPieces - skin.price,
            ownedSkins: [...state.ownedSkins, skin],
          };
        }),

      // Purchase a theme if the player has enough silver pieces
      purchaseTheme: (themeId: string) =>
        set((state) => {
          const theme = availableThemes.find((t) => t.id === themeId);
          if (!theme || state.silverPieces < theme.price) return state;

          // Ensure the theme isn't already owned
          if (state.ownedThemes.some((ownedTheme) => ownedTheme.id === themeId)) {
            console.warn(`Theme "${theme.name}" is already owned.`);
            return state;
          }

          return {
            silverPieces: state.silverPieces - theme.price,
            ownedThemes: [...state.ownedThemes, theme],
          };
        }),

      // Set the active skin (only if it's owned)
      setActiveSkin: (skinId: string | null) =>
        set((state) => {
          if (!skinId || !state.ownedSkins.some((skin) => skin.id === skinId)) {
            console.error(`Cannot set active skin: "${skinId}" is not owned.`);
            return state;
          }
          return { activeSkin: skinId };
        }),

      // Set the active theme (only if it's owned)
      setActiveTheme: (themeId: string | null) =>
        set((state) => {
          if (
            !themeId ||
            !state.ownedThemes.some((theme) => theme.id === themeId)
          ) {
            console.error(`Cannot set active theme: "${themeId}" is not owned.`);
            return state;
          }
          return { activeTheme: themeId };
        }),

      // Update mission progress
      updateMissionProgress: (missionId: string, progress: number) =>
        set((state) => ({
          missions: state.missions.map((mission) =>
            mission.id === missionId
              ? {
                  ...mission,
                  progress: Math.min(mission.requirement, progress),
                  completed: progress >= mission.requirement,
                }
              : mission
          ),
        })),

      // Save user data to Firestore
      saveUserDataToFirebase: async () => {
        const { userId, ...userData } = get();
        if (!userId) {
          console.error("User ID is required to save data.");
          return;
        }
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, userData);
        console.log("User data saved to Firestore.");
      },

      // Load user data from Firestore
      loadUserDataFromFirebase: async (userId: string) => {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          set({ ...userSnap.data(), userId } as GameStore);
          console.log("User data loaded from Firestore.");
        } else {
          console.warn("No user data found in Firestore.");
        }
      },
    }),
    {
      name: "chess-game-storage", // Persisted storage key
    }
  )
);

// Export skins and themes for external use
export { availableSkins, availableThemes };