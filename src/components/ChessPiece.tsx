// src/components/ChessPiece.tsx
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ChessPieceProps {
  type: string; // e.g., "p", "n", "b", "r", "q", "k"
  color: "b" | "w"; // Black or White
  isSelected?: boolean; // Whether the piece is currently selected
  skinId?: string; // Optional prop to handle custom skins
}

// Define the mapping of skins to SVG paths
const skins = {
  classic: {
    w: {
      p: "/pieces/classic/white-pawn.svg",
      n: "/pieces/classic/white-knight.svg",
      b: "/pieces/classic/white-bishop.svg",
      r: "/pieces/classic/white-rook.svg",
      q: "/pieces/classic/white-queen.svg",
      k: "/pieces/classic/white-king.svg",
    },
    b: {
      p: "/pieces/classic/black-pawn.svg",
      n: "/pieces/classic/black-knight.svg",
      b: "/pieces/classic/black-bishop.svg",
      r: "/pieces/classic/black-rook.svg",
      q: "/pieces/classic/black-queen.svg",
      k: "/pieces/classic/black-king.svg",
    },
  },
  ancient: {
    w: {
      p: "/pieces/ancient/white-pawn.svg",
      n: "/pieces/ancient/white-knight.svg",
      b: "/pieces/ancient/white-bishop.svg",
      r: "/pieces/ancient/white-rook.svg",
      q: "/pieces/ancient/white-queen.svg",
      k: "/pieces/ancient/white-king.svg",
    },
    b: {
      p: "/pieces/ancient/black-pawn.svg",
      n: "/pieces/ancient/black-knight.svg",
      b: "/pieces/ancient/black-bishop.svg",
      r: "/pieces/ancient/black-rook.svg",
      q: "/pieces/ancient/black-queen.svg",
      k: "/pieces/ancient/black-king.svg",
    },
  },
  golden: {
    w: {
      p: "/pieces/golden/white-pawn.svg",
      n: "/pieces/golden/white-knight.svg",
      b: "/pieces/golden/white-bishop.svg",
      r: "/pieces/golden/white-rook.svg",
      q: "/pieces/golden/white-queen.svg",
      k: "/pieces/golden/white-king.svg",
    },
    b: {
      p: "/pieces/golden/black-pawn.svg",
      n: "/pieces/golden/black-knight.svg",
      b: "/pieces/golden/black-bishop.svg",
      r: "/pieces/golden/black-rook.svg",
      q: "/pieces/golden/black-queen.svg",
      k: "/pieces/golden/black-king.svg",
    },
  },
};

// Function to fetch and return the SVG content
const getPieceSvg = async (
  type: string,
  color: "b" | "w",
  skinId?: string
): Promise<string | null> => {
  const selectedSkin = skins[skinId || "classic"];
  if (!selectedSkin) {
    console.error(`Invalid skinId: ${skinId}`);
    return null;
  }

  const svgPath = selectedSkin[color][type];
  try {
    const response = await fetch(svgPath);
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${svgPath}`);
    }
    const svgContent = await response.text();
    return svgContent;
  } catch (error) {
    console.error(`Error loading SVG: ${svgPath}`, error);
    return null;
  }
};

const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  isSelected = false,
  skinId,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  // Load the SVG content when the component mounts or props change
  useEffect(() => {
    getPieceSvg(type, color, skinId).then((content) => {
      setSvgContent(content);
    });
  }, [type, color, skinId]);

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center transition-all duration-200",
        isSelected ? "scale-110 rotate-3" : "scale-100 hover:scale-105 hover:-rotate-1"
      )}
    >
      {svgContent ? (
        // Render the SVG content dynamically
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          className="w-8 h-8"
        />
      ) : (
        // Fallback character if SVG fails to load
        <span className="text-4xl text-gray-500">?</span>
      )}
    </div>
  );
};

export default ChessPiece;