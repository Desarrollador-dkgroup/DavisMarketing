import { CalendarDays, Globe2, Smartphone } from "lucide-react";

/** Proyectos del portafolio. Para agregar uno nuevo basta con sumar un objeto aquí. */
export const projects = [
  {
    id: "panama-viajero",
    name: "Panamá Viajero",
    category: "Turismo digital",
    description:
      "Una plataforma digital que conecta a viajeros nacionales e internacionales con " +
      "experiencias turísticas de todo Panamá de una forma clara, visual y cercana.",
    image: "/proyects/panamaViajero/PanamaViajero.svg",
    services: [
      { name: "Sitio web", Icon: Globe2 },
      { name: "App móvil", Icon: Smartphone },
    ],
    link: { href: "https://panamaviajero.app/", label: "Visitar página" },
    accent: "#AAC551",
  },
  {
    id: "expo-educate",
    name: "Expo Edúcate",
    category: "Educación superior",
    description:
      "Un evento para que los estudiantes de bachillerato escojan su universidad y conozcan " +
      "todas las posibilidades que les ofrecen las diferentes universidades.",
    image: "/proyects/expoEducate/Expoeducate.svg",
    services: [
      { name: "Evento presencial", Icon: CalendarDays },
      { name: "Instagram", Icon: Smartphone },
    ],
    link: { href: "https://www.instagram.com/expoeducatesuperior", label: "Ver Instagram" },
    accent: "#3B6FC0",
  },
  {
    id: "pa-la-u",
    name: "Pa' la U",
    category: "Educación",
    description:
      "Libro digital y físico para estudiantes universitarios y de secundaria, pensado para " +
      "tomar notas y apuntes durante todo el año académico.",
    image: "/proyects/palaU/PalaU.svg",
    services: [
      { name: "Evento presencial", Icon: CalendarDays },
      { name: "Instagram", Icon: Smartphone },
    ],
    link: null,
    accent: "#AAC551",
  },
];
