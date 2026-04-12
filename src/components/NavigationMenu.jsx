import React from "react";
import { tourNodes, tourOrder } from "../data/tourNodes";
import {
  Home,
  Map,
  X,
  ChevronRight,
  Calendar,
  Phone,
  CheckCircle2,
} from "lucide-react";

const ROOM_ICONS = {
  entrada: Home,
  sala: Map,
  cocina: ChevronRight,
  pasillo: ChevronRight,
  dormitorio_principal: ChevronRight,
};

/**
 * NavigationMenu
 * Collapsible glassmorphism sidebar panel with:
 * - Company branding
 * - Room quick-navigation list
 * - "Agendar Visita" CTA
 */
function NavigationMenu({ currentNodeId, onNavigate, isOpen, onToggle }) {
  const rooms = tourOrder.map((id) => tourNodes[id]);

  return (
    <>
      {/* Toggle button - always visible */}
      <button
        onClick={onToggle}
        className="fixed top-5 left-5 z-50 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: "48px",
          height: "48px",
          background: isOpen
            ? "rgba(200, 220, 255, 0.15)"
            : "rgba(10, 15, 28, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
      >
        {isOpen ? (
          <X size={20} color="white" strokeWidth={2} />
        ) : (
          <Map size={20} color="white" strokeWidth={2} />
        )}
      </button>

      {/* Sidebar panel */}
      <div
        className="fixed top-0 left-0 h-full z-40 flex flex-col"
        style={{
          width: "300px",
          maxWidth: "85vw",
          background: "rgba(8, 12, 24, 0.88)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "4px 0 40px rgba(0,0,0,0.6)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Header / Brand */}
        <div
          className="flex flex-col items-center justify-center pt-12 pb-6 px-6"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Logo circle */}
          <div
            className="flex items-center justify-center mb-3 rounded-xl"
            style={{
              width: "52px",
              height: "52px",
              background:
                "linear-gradient(135deg, #1a4fc4 0%, #0e2d7a 100%)",
              boxShadow: "0 4px 16px rgba(26, 79, 196, 0.4)",
            }}
          >
            <Home size={24} color="white" strokeWidth={2} />
          </div>
          <h2
            className="text-white font-bold text-center leading-tight"
            style={{ fontSize: "15px", letterSpacing: "0.01em" }}
          >
            CAT Corporación
            <br />
            Inmobiliaria
          </h2>
          <p
            className="text-center mt-1.5"
            style={{ fontSize: "11px", color: "rgba(160, 180, 220, 0.8)" }}
          >
            Recorrido Virtual 360°
          </p>
        </div>

        {/* Property title */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "10px", color: "rgba(100, 140, 210, 0.9)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
            Propiedad
          </p>
          <p style={{ fontSize: "13px", color: "rgba(220, 230, 255, 0.9)", lineHeight: "1.4", fontWeight: 500 }}>
            Departamento de Estreno 150m²
          </p>
          <p style={{ fontSize: "11px", color: "rgba(130, 155, 200, 0.8)", marginTop: "2px" }}>
            Av. Alameda de la República
          </p>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <p
            className="px-2 mb-2"
            style={{
              fontSize: "10px",
              color: "rgba(100, 140, 210, 0.8)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Ambientes
          </p>

          {rooms.map((room, idx) => {
            const isActive = room.id === currentNodeId;
            return (
              <button
                key={room.id}
                onClick={() => {
                  onNavigate(room.id);
                  onToggle();
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(26, 79, 196, 0.5) 0%, rgba(14, 45, 122, 0.4) 100%)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(100, 160, 255, 0.35)"
                    : "1px solid transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                {/* Room number badge */}
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: isActive
                      ? "rgba(26, 79, 196, 0.8)"
                      : "rgba(255, 255, 255, 0.07)",
                    border: isActive
                      ? "1px solid rgba(100, 160, 255, 0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: isActive
                      ? "white"
                      : "rgba(160, 180, 220, 0.7)",
                  }}
                >
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="truncate"
                    style={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? "white"
                        : "rgba(180, 200, 240, 0.8)",
                    }}
                  >
                    {room.name}
                  </p>
                  <p
                    className="truncate"
                    style={{
                      fontSize: "10px",
                      color: isActive
                        ? "rgba(160, 190, 255, 0.8)"
                        : "rgba(120, 145, 190, 0.6)",
                      marginTop: "1px",
                    }}
                  >
                    {room.description}
                  </p>
                </div>

                {isActive && (
                  <CheckCircle2
                    size={14}
                    style={{ color: "rgba(100, 160, 255, 0.9)", flexShrink: 0 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div
          className="px-4 py-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Features */}
          <div className="flex justify-between mb-4 px-1">
            {[
              { value: "150", unit: "m²" },
              { value: "3", unit: "Dorm." },
              { value: "2", unit: "Baños" },
            ].map((feat) => (
              <div key={feat.unit} className="text-center">
                <p style={{ fontSize: "18px", fontWeight: 700, color: "white", lineHeight: 1 }}>
                  {feat.value}
                </p>
                <p style={{ fontSize: "10px", color: "rgba(130,160,210,0.8)", marginTop: "2px" }}>
                  {feat.unit}
                </p>
              </div>
            ))}
          </div>

          <a
            href="tel:+51999999999"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-2"
            style={{
              background: "linear-gradient(135deg, #1a4fc4 0%, #0e2d7a 100%)",
              color: "white",
              fontSize: "13px",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(26, 79, 196, 0.45)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(26, 79, 196, 0.65)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(26, 79, 196, 0.45)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Phone size={15} strokeWidth={2.5} />
            Llamar Ahora
          </a>

          <button
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(200, 220, 255, 0.9)",
              fontSize: "13px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
            onClick={() => alert("¡Gracias por su interés! Un asesor se pondrá en contacto con usted.")}
          >
            <Calendar size={15} strokeWidth={2.5} />
            Agendar Visita
          </button>
        </div>
      </div>

      {/* Backdrop overlay when menu is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={onToggle}
        />
      )}
    </>
  );
}

export default NavigationMenu;
