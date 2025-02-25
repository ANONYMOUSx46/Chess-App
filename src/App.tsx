// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Inventory from "./pages/Inventory";
import Missions from "./pages/Missions";

const queryClient = new QueryClient();

const App = () => {
  // Apply saved theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground">
            {/* Main App Content */}
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Index />} />

              {/* Custom Pages */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/missions" element={<Missions />} />

              {/* Catch-all Route for 404 Errors */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;