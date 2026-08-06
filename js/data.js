/**
 * ============================================================
 *  data.js — EDITA SOLO ESTE ARCHIVO PARA ACTUALIZAR TU SITIO
 * ============================================================
 * No necesitas tocar HTML, CSS ni el resto del JS.
 * Reemplaza los valores de ejemplo por tu información real.
 * Guarda y sube los cambios a tu repo (git add / commit / push).
 */

const PORTFOLIO_DATA = {

  // -----------------------------
  // 1. INFORMACIÓN PERSONAL
  // -----------------------------
  perfil: {
    nombre: "Joaquin Chaparro Villavicecio",                 // tu nombre completo
    nick: "JoaquinDev",                       // opcional, se usa en el logo
    rolDestacado: "Ingeniería de Software", // palabra que se resalta en el hero
    ubicacion: "Lima, Perú",
    disponible: true,                      // true = muestra badge "Disponible para prácticas/empleo"
    descripcion: "Estudiante de Ingeniería de Software del 6to ciclo en Universidad Tecnológica del Perú. Con conocimientos en desarrollo de software y la tecnología de la información.",
    avatar: "assets/img/foto_perfil.jpg",           // reemplaza este archivo por tu foto, o deja vacío para iniciales
    email: "joaquiningsoft@gmail.com",
    linkedin: "https://linkedin.com/in/joaquin-chaparro-ingsoft/",
    github: "https://github.com/JoaquinStudent/",
    whatsapp: "https://wa.me/51906958117",
    cv: "assets/CV.pdf"                    // sube tu CV en pdf a la carpeta assets/
  },

  // -----------------------------
  // 2. SOBRE MÍ
  // -----------------------------
  sobreMi: {
  quienSoy: "Soy un entusiasta del desarrollo de software, siempre buscando crear soluciones prácticas para problemas reales. He trabajado en el desarrollo de aplicaciones web, participando en todas las fases del proyecto: desde el diseño de la interfaz y el modelado de endpoints, hasta el despliegue en producción. Me interesa todo el proceso de desarrollo, asegurando que las aplicaciones no solo resuelvan problemas de negocio, sino que también ofrezcan una experiencia sólida y confiable al usuario.",
  comoTrabajo: "Valoro el trabajo en equipo y creo que la comunicación y el compromiso son esenciales para el éxito. Me gusta colaborar con otros desarrolladores y recibir retroalimentación para mejorar continuamente. En mi tiempo libre, disfruto escuchando música y explorando nuevas tecnologías a través de videos y tutoriales.",
},

  // -----------------------------
  // 3. HABILIDADES TÉCNICAS
  // -----------------------------
  skills: {
    lenguajes: ["JavaScript", "TypeScript", "Java", "Python"],
    frameworks: ["React", "Node.js", "Spring Boot", "Tailwind CSS"],
    basesDeDatos: ["PostgreSQL", "MongoDB", "MySQL"],
    herramientas: ["Git", "VS Code", "Docker", "Figma"],
    gestion: ["Scrum", "Kanban"]
  },

  // Competencias blandas / idiomas / herramientas generales
  competencias: {
    blandas: ["Trabajo en equipo", "Comunicación efectiva", "Resolución de problemas", "Adaptabilidad", "Aprendizaje continuo"],
    generales: ["Notion", "Canva", "Google Docs", "Slack"],
    idiomas: ["Español (nativo)", "Inglés (intermedio)"]
  },

  // -----------------------------
  // 4. PROYECTOS
  // -----------------------------
  // Agrega, quita o edita los objetos de este arreglo.
  // "stack" es un arreglo de strings cortos (se muestran como chips).
  proyectos: [
    {
      nombre: "NombreDelProyecto",
      descripcion: "Descripción corta y clara de qué hace el proyecto y qué problema resuelve. 1-2 líneas.",
      imagen: "assets/proyecto-placeholder.svg",
      stack: ["React", "Node.js", "PostgreSQL"],
      github: "https://github.com/tu-usuario/proyecto",
      demo: "",  // deja vacío si no tienes demo en vivo
    },
    {
      nombre: "SegundoProyecto",
      descripcion: "Descripción corta y clara de qué hace el proyecto y qué problema resuelve. 1-2 líneas.",
      imagen: "assets/proyecto-placeholder.svg",
      stack: ["Java", "Spring Boot", "MySQL"],
      github: "https://github.com/tu-usuario/proyecto2",
      demo: "",
    },
    {
      nombre: "TercerProyecto",
      descripcion: "Descripción corta y clara de qué hace el proyecto y qué problema resuelve. 1-2 líneas.",
      imagen: "assets/proyecto-placeholder.svg",
      stack: ["Python", "Flask"],
      github: "https://github.com/tu-usuario/proyecto3",
      demo: "",
    },
    {
      nombre: "TercerProyecto",
      descripcion: "Descripción corta y clara de qué hace el proyecto y qué problema resuelve. 1-2 líneas.",
      imagen: "assets/proyecto-placeholder.svg",
      stack: ["Python", "Flask"],
      github: "https://github.com/tu-usuario/proyecto3",
      demo: "",
    },
    {
      nombre: "TercerProyecto",
      descripcion: "Descripción corta y clara de qué hace el proyecto y qué problema resuelve. 1-2 líneas.",
      imagen: "assets/proyecto-placeholder.svg",
      stack: ["Python", "Flask"],
      github: "https://github.com/tu-usuario/proyecto3",
      demo: "",
    }
    
  ],

  // -----------------------------
  // 5. FOOTER
  // -----------------------------
  footer: {
    tagline: "Gracias por visitar mi portafolio. Escríbeme si quieres conversar sobre alguno de estos proyectos.",
    anio: 2026
  }
};
