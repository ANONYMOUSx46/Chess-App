
import React from "react";
import { useGameStore, availableSkins, availableThemes } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "text-yellow-500";
    case "epic":
      return "text-purple-500";
    case "rare":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

const ShopItem = ({ 
  type, 
  id, 
  name, 
  price, 
  preview, 
  rarity, 
  owned, 
  active, 
  onPurchase, 
  onSelect 
}: { 
  type: "skin" | "theme";
  id: string;
  name: string;
  price: number;
  preview: string;
  rarity?: string;
  owned: boolean;
  active: boolean;
  onPurchase: () => void;
  onSelect: () => void;
}) => (
  <div className="relative group rounded-lg border p-4 space-y-3 hover:shadow-md transition-all duration-200 bg-white">
    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
      <img
        src={preview}
        alt={name}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
      />
      {rarity && (
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold bg-black/70 ${getRarityColor(rarity)}`}>
          {rarity}
        </span>
      )}
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold">{name}</h3>
      {owned ? (
        <Button
          variant={active ? "default" : "outline"}
          className="w-full"
          onClick={onSelect}
        >
          {active ? "Selected" : "Select"}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={onPurchase}
        >
          Purchase for {price} SP
        </Button>
      )}
    </div>
  </div>
);

const GameMenu = () => {
  const {
    silverPieces,
    ownedSkins,
    ownedThemes,
    activeSkin,
    activeTheme,
    missions,
    purchaseSkin,
    purchaseTheme,
    setActiveSkin,
    setActiveTheme,
  } = useGameStore();

  const handlePurchase = (type: "skin" | "theme", id: string, price: number) => {
    if (silverPieces < price) {
      toast.error("Not enough silver pieces!");
      return;
    }

    if (type === "skin") {
      purchaseSkin(id);
      toast.success("Skin purchased successfully!");
    } else {
      purchaseTheme(id);
      toast.success("Theme purchased successfully!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Game Menu</h2>
        <div className="text-lg font-semibold flex items-center gap-2">
          <span className="text-yellow-500">⚡</span>
          <span>{silverPieces} SP</span>
        </div>
      </div>

      <Tabs defaultValue="shop" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="mt-4">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Piece Skins</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableSkins.map((skin) => (
                    <ShopItem
                      key={skin.id}
                      type="skin"
                      {...skin}
                      owned={ownedSkins.some((s) => s.id === skin.id)}
                      active={activeSkin === skin.id}
                      onPurchase={() => handlePurchase("skin", skin.id, skin.price)}
                      onSelect={() => setActiveSkin(skin.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Board Themes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableThemes.map((theme) => (
                    <ShopItem
                      key={theme.id}
                      type="theme"
                      {...theme}
                      owned={ownedThemes.some((t) => t.id === theme.id)}
                      active={activeTheme === theme.id}
                      onPurchase={() => handlePurchase("theme", theme.id, theme.price)}
                      onSelect={() => setActiveTheme(theme.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Skins</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ownedSkins.map((skin) => (
                    <ShopItem
                      key={skin.id}
                      type="skin"
                      {...skin}
                      owned={true}
                      active={activeSkin === skin.id}
                      onPurchase={() => {}}
                      onSelect={() => setActiveSkin(skin.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Your Themes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ownedThemes.map((theme) => (
                    <ShopItem
                      key={theme.id}
                      type="theme"
                      {...theme}
                      owned={true}
                      active={activeTheme === theme.id}
                      onPurchase={() => {}}
                      onSelect={() => setActiveTheme(theme.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="missions" className="mt-4">
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="space-y-4">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="p-4 border rounded-lg flex flex-col gap-2"
                >
                  <h3 className="font-semibold">{mission.title}</h3>
                  <p className="text-sm text-gray-600">{mission.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      Progress: {mission.progress}/{mission.requirement}
                    </div>
                    <div className="text-sm font-semibold">
                      Reward: {mission.reward} SP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameMenu;
