import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";

/**
 * HotspotMarker
 * A floating interactive button positioned absolutely on the tour image.
 * Shows a tooltip on hover and fires onNavigate on click.
 */
const ICON_MAP = {
  ArrowUp: LucideIcons.ArrowUp,
  ArrowDown: LucideIcons.ArrowDown,
  ArrowLeft: LucideIcons.ArrowLeft,
  ArrowRight: LucideIcons.ArrowRight,
  DoorOpen: LucideIcons.DoorOpen,
  Home: LucideIcons.Home,
};

function HotspotMarker({ hotspot, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = ICON_MAP[hotspot.icon] || LucideIcons.ArrowUp;

  return (
    <div
      className="hotspot-btn"
      style={{ top: hotspot.top, left: hotspot.left }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(hotspot.targetId)}
    >
      {/* Pulse rings */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(30, 90, 200, 0.3)",
          animation: "pulse-ring 2.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(30, 90, 200, 0.2)",
          animation: "pulse-ring 2.2s 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        }}
      />

      {/* Main button */}
      <div
        className="relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
        style={{
          width: hovered ? "56px" : "48px",
          height: hovered ? "56px" : "48px",
          background: hovered
            ? "rgba(30, 90, 200, 0.9)"
            : "rgba(10, 15, 28, 0.72)",
          border: hovered
            ? "2px solid rgba(100, 160, 255, 0.9)"
            : "2px solid rgba(255, 255, 255, 0.35)",
          boxShadow: hovered
            ? "0 0 24px rgba(30, 90, 200, 0.6), 0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 16px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          animation: !hovered ? "bounce-gentle 2.5s ease-in-out infinite" : "none",
        }}
      >
        <IconComponent
          size={hovered ? 24 : 20}
          color="white"
          strokeWidth={2.5}
          style={{ transition: "all 0.3s ease" }}
        />
      </div>

      {/* Tooltip */}
      <div
        className="hotspot-tooltip absolute bottom-full left-1/2 mb-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-white pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(6px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          background: "rgba(10, 15, 28, 0.9)",
          border: "1px solid rgba(100, 160, 255, 0.4)",
          backdropFilter: "blur(12px)",
          letterSpacing: "0.02em",
        }}
      >
        {hotspot.label}
        {/* Arrow tip */}
        <span
          className="absolute left-1/2 top-full -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid rgba(10, 15, 28, 0.9)",
          }}
        />
      </div>
    </div>
  );
}

export default HotspotMarker;
