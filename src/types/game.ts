
export type PieceSkin = {
  id: string;
  name: string;
  price: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  preview: string;
};

export type BoardTheme = {
  id: string;
  name: string;
  price: number;
  lightSquare: string;
  darkSquare: string;
  preview: string;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: "win" | "capture" | "checkmate" | "moves";
  requirement: number;
  progress: number;
};

export type GameState = {
  silverPieces: number;
  ownedSkins: PieceSkin[];
  ownedThemes: BoardTheme[];
  activeSkin: string | null;
  activeTheme: string | null;
  missions: Mission[];
};
