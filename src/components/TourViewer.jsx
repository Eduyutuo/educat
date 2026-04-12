import React, { useState, useEffect, useCallback } from "react";
import { tourNodes, tourOrder } from "../data/tourNodes";
import HotspotMarker from "./HotspotMarker";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

/**
 * TourViewer
 * Main component that renders the full-screen virtual tour image
 * with hotspot markers overlay and bottom breadcrumb navigation.
 */
function TourViewer({ currentNodeId, onNavigate }) {
  const [displayNodeId, setDisplayNodeId] = useState(currentNodeId);
  const [opacity, setOpacity] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Fade transition when node changes
  useEffect(() => {
    if (currentNodeId === displayNodeId) return;

    setIsTransitioning(true);
    setOpacity(0);

    const timer = setTimeout(() => {
      setDisplayNodeId(currentNodeId);
      setOpacity(1);
      setIsTransitioning(false);
      setShowInfo(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentNodeId]);

  const node = tourNodes[displayNodeId];
  if (!node) return null;

  const currentIndex = tourOrder.indexOf(displayNodeId);
  const prevId = currentIndex > 0 ? tourOrder[currentIndex - 1] : null;
  const nextId = currentIndex < tourOrder.length - 1 ? tourOrder[currentIndex + 1] : null;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#0a0f1c" }}
    >
      {/* Full-screen background image with fade transition */}
      <div
        className="absolute inset-0"
        style={{
          opacity,
          transition: "opacity 0.5s ease-in-out",
          backgroundImage: `url(${node.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlays for UI legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 25%)",
        }}
      />

      {/* Hotspot markers (only when not transitioning) */}
      {!isTransitioning &&
        node.hotspots.map((hotspot) => (
          <HotspotMarker
            key={hotspot.id}
            hotspot={hotspot}
            onNavigate={onNavigate}
          />
        ))}

      {/* Top-right: Info button */}
      <button
        onClick={() => setShowInfo((v) => !v)}
        className="absolute top-5 right-5 z-30 flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          width: "44px",
          height: "44px",
          background: showInfo
            ? "rgba(26, 79, 196, 0.85)"
            : "rgba(10, 15, 28, 0.7)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          cursor: "pointer",
        }}
        aria-label="Información del ambiente"
      >
        <Info size={18} color="white" strokeWidth={2} />
      </button>

      {/* Info tooltip panel */}
      {showInfo && (
        <div
          className="absolute top-16 right-5 z-30 p-4 rounded-2xl"
          style={{
            minWidth: "220px",
            background: "rgba(8, 12, 24, 0.9)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            animation: "fade-in 0.2s ease-out forwards",
          }}
        >
          <p style={{ fontSize: "11px", color: "rgba(100, 140, 210, 0.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
            Ambiente
          </p>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            {node.name}
          </p>
          <p style={{ fontSize: "12px", color: "rgba(160, 185, 230, 0.85)", lineHeight: "1.5" }}>
            {node.description}
          </p>
          <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ fontSize: "11px", color: "rgba(100, 140, 210, 0.8)" }}>
              {node.hotspots.length} {node.hotspots.length === 1 ? "acceso disponible" : "accesos disponibles"}
            </p>
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4"
        style={{
          background:
            "linear-gradient(to top, rgba(8,12,24,0.9) 0%, rgba(8,12,24,0.6) 60%, transparent 100%)",
        }}
      >
        {/* Previous room */}
        <button
          onClick={() => prevId && onNavigate(prevId)}
          disabled={!prevId}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
          style={{
            background: prevId ? "rgba(255,255,255,0.08)" : "transparent",
            border: "1px solid",
            borderColor: prevId ? "rgba(255,255,255,0.15)" : "transparent",
            color: prevId ? "rgba(200,215,255,0.9)" : "transparent",
            fontSize: "12px",
            fontWeight: 500,
            cursor: prevId ? "pointer" : "default",
            backdropFilter: prevId ? "blur(12px)" : "none",
          }}
          aria-label="Habitación anterior"
        >
          <ChevronLeft size={15} />
          {prevId && <span className="hidden sm:block">{tourNodes[prevId]?.name}</span>}
        </button>

        {/* Current room indicator */}
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-white font-semibold text-center"
            style={{ fontSize: "14px", letterSpacing: "0.01em", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {node.name}
          </p>
          {/* Dots indicator */}
          <div className="flex gap-1.5">
            {tourOrder.map((id) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                style={{
                  width: id === displayNodeId ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: id === displayNodeId
                    ? "rgba(100, 160, 255, 0.9)"
                    : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
                aria-label={`Ir a ${tourNodes[id]?.name}`}
              />
            ))}
          </div>
        </div>

        {/* Next room */}
        <button
          onClick={() => nextId && onNavigate(nextId)}
          disabled={!nextId}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
          style={{
            background: nextId ? "rgba(255,255,255,0.08)" : "transparent",
            border: "1px solid",
            borderColor: nextId ? "rgba(255,255,255,0.15)" : "transparent",
            color: nextId ? "rgba(200,215,255,0.9)" : "transparent",
            fontSize: "12px",
            fontWeight: 500,
            cursor: nextId ? "pointer" : "default",
            backdropFilter: nextId ? "blur(12px)" : "none",
          }}
          aria-label="Siguiente habitación"
        >
          {nextId && <span className="hidden sm:block">{tourNodes[nextId]?.name}</span>}
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default TourViewer;
