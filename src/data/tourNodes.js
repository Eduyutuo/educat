// Tour data: nodes map for the virtual tour
// Each node represents a room/space with its image and hotspots

export const tourNodes = {
  entrada: {
    id: "entrada",
    name: "Recibidor Principal",
    description: "La bienvenida al hogar de tus sueños",
    image: "/img_entrance.png",
    hotspots: [
      {
        id: "entrada_to_sala",
        targetId: "sala",
        top: "52%",
        left: "50%",
        label: "Ingresar a la Sala",
        icon: "ArrowUp",
      },
    ],
  },

  sala: {
    id: "sala",
    name: "Sala de Estar y Comedor",
    description: "Amplio espacio social con ventanal panorámico",
    image: "/img_living_room.png",
    hotspots: [
      {
        id: "sala_to_cocina",
        targetId: "cocina",
        top: "55%",
        left: "18%",
        label: "Ir a Cocina",
        icon: "ArrowLeft",
      },
      {
        id: "sala_to_pasillo",
        targetId: "pasillo",
        top: "50%",
        left: "82%",
        label: "Ir al Pasillo",
        icon: "ArrowRight",
      },
      {
        id: "sala_to_entrada",
        targetId: "entrada",
        top: "70%",
        left: "50%",
        label: "Volver al Recibidor",
        icon: "ArrowDown",
      },
    ],
  },

  cocina: {
    id: "cocina",
    name: "Cocina Minimalista",
    description: "Diseño gris y cuarzo blanco de primer nivel",
    image: "/img_kitchen.png",
    hotspots: [
      {
        id: "cocina_to_sala",
        targetId: "sala",
        top: "55%",
        left: "82%",
        label: "Volver a la Sala",
        icon: "ArrowRight",
      },
    ],
  },

  pasillo: {
    id: "pasillo",
    name: "Pasillo Principal",
    description: "Corredor iluminado hacia las habitaciones privadas",
    image: "/img_hallway.png",
    hotspots: [
      {
        id: "pasillo_to_dormitorio",
        targetId: "dormitorio_principal",
        top: "45%",
        left: "50%",
        label: "Entrar al Dormitorio",
        icon: "ArrowUp",
      },
      {
        id: "pasillo_to_sala",
        targetId: "sala",
        top: "65%",
        left: "20%",
        label: "Volver a la Sala",
        icon: "ArrowLeft",
      },
    ],
  },

  dormitorio_principal: {
    id: "dormitorio_principal",
    name: "Dormitorio Principal",
    description: "Suite master con vista a las montañas y cama king",
    image: "/img_master_bedroom.png",
    hotspots: [
      {
        id: "dormitorio_to_pasillo",
        targetId: "pasillo",
        top: "68%",
        left: "50%",
        label: "Volver al Pasillo",
        icon: "ArrowDown",
      },
    ],
  },
};

// Ordered list for navigation menu
export const tourOrder = [
  "entrada",
  "sala",
  "cocina",
  "pasillo",
  "dormitorio_principal",
];
