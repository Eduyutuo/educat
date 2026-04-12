import React, { useState, useCallback } from "react";
import TourViewer from "./components/TourViewer";
import NavigationMenu from "./components/NavigationMenu";

/**
 * App.jsx - Root component
 * Composes TourViewer and NavigationMenu, manages shared navigation state.
 */
function App() {
  const [currentNodeId, setCurrentNodeId] = useState("entrada");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = useCallback((targetId) => {
    setCurrentNodeId(targetId);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Main tour viewer */}
      <TourViewer
        currentNodeId={currentNodeId}
        onNavigate={handleNavigate}
      />

      {/* Navigation sidebar overlay */}
      <NavigationMenu
        currentNodeId={currentNodeId}
        onNavigate={handleNavigate}
        isOpen={menuOpen}
        onToggle={handleToggleMenu}
      />
    </div>
  );
}

export default App;
