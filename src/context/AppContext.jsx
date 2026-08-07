import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export const translations = {
  es: {
    /* ── NAV ── */
    home: "Inicio",
    concerts: "Conciertos",
    biography: "Biografía",
    services: "Servicios",
    navCourses: "Cursos",
    masterclass: "Masterclass",
    contact: "Contacto",
    platform: "Plataforma",
    startNow: "Empezar ahora",
    changeLanguage: "Cambiar idioma",
    platformsTitle: "Plataformas",
    platformsSubtitle: "Elige tu plataforma",
    platformsPlay: "Play",
    platformsDownload: "Descargar",

    /* ── HERO ── */
    heroTitle1: "Jesús",
    heroTitle2: "Molina",
    heroTitle3: "Pianista · Compositor · Intérprete",
    heroSub: "Más de 14 años sobre los escenarios de 9 países, dominando más de 5 instrumentos. La música no es solo lo que hago — es lo que soy.",
    heroCta1: "Descubre mi música",
    heroCta2: "Ver en vivo",
    heroScrollDown: "Desplázate",
    heroStat1Label: "años de carrera",
    heroStat2Label: "países",
    heroStat3Label: "instrumentos",

    /* ── COURSES CAROUSEL ── */
    coursesCarouselEyebrow: "— CLAMA Academy",
    coursesCarouselTitle: "CLAMA COURSES",
    coursesCarouselSub: "Explora nuestra amplia variedad de cursos especializados diseñados para todos los niveles. Desde fundamentos del piano y técnica clásica hasta armonía avanzada, improvisación de jazz y composición creativa dentro de la plataforma CLAMA.",
    coursesCatalogTitle: "Catálogo de Cursos",
    clamaVideoBadge: "Conoce la plataforma CLAMA",
    viewCourse: "Ver curso",

    /* ── METHOD ── */
    methodEyebrow: "— Cómo funciona",
    methodTitle: "Tu camino, en tres movimientos",
    methodSub: "Como una sonata: exposición, desarrollo y recapitulación. Cada curso sigue esta misma estructura, para que el progreso se sienta y no haya que adivinarlo.",
    methodBentoBeginnerLabel: "Para empezar",
    methodBentoBeginnerTitle: "Nivel inicial",
    methodBentoBeginnerDesc: "Para alumnos de todos los niveles",
    methodBentoStep1: "Paso 4 · Escalas",
    methodBentoStep2: "Paso 5 · Acordes",
    methodBentoCommunityTitle: "Comunidad",
    methodBentoCommunityDesc: "Alumnos afines y siempre dispuestos a compartir avances",
    methodBentoAppLabel: "Próximamente",
    methodBentoAppTitle: "App de práctica",
    methodBentoAppDesc: "Tu progreso, partituras y métricas en un solo lugar",
    methodBentoTopicsTitle: "Elige tu repertorio",
    methodBentoTopicsDesc: "Personaliza tu plan de estudio por estilo",
    methodBentoTags: ["Clásico", "Jazz", "Pop & Latino", "Bandas sonoras", "Improvisación", "Técnica"],
    methodCards: [
      { mark: "I", icon: "file", title: "Diagnóstico y bases", desc: "Evaluamos tu nivel real, corregimos postura y mano, y fijamos lectura musical desde el primer ejercicio — no después de 10 clases.", tag: "Semanas 1–3" },
      { mark: "II", icon: "compass", title: "Repertorio guiado", desc: "Eliges una pieza real que quieras tocar y la trabajamos por partes, con retroalimentación en cada sesión y ejercicios técnicos hechos a su medida.", tag: "Semanas 4–10" },
      { mark: "III", icon: "star", title: "Interpretación y escenario", desc: "Pulimos dinámica, fraseo y expresión. Cierras el curso con una pieza lista para grabar, tocar en familia o subir a tus redes.", tag: "Semanas 11–12" },
    ],
    methodShowcaseTitle: "Practica con seguimiento real, no solo con buena voluntad",
    methodShowcaseDesc: "Cada alumno recibe acceso a la plataforma de práctica: video-clases descargables, partituras anotadas y métricas de progreso por pieza.",
    methodShowcaseItems: [
      "Video-clases en HD, disponibles para siempre",
      "Partituras digitales con anotaciones personalizadas",
      "Corrección de video semanal, en menos de 48h",
    ],
    methodPhoneProgress: "Mi progreso",
    methodWeek: "Semana 6 de 12",
    methodContinue: "Continuar práctica",

    /* ── COURSES ── */
    coursesEyebrow: "— Catálogo",
    coursesTitle: "Elige tu próxima pieza",
    coursesSub: "Cuatro programas, cada uno pensado para un punto de partida distinto. Todos incluyen clases en vivo, material descargable y corrección personalizada.",
    coursesSeeDetail: "Ver detalle →",
    coursesPriceUnit: "/mes",
    courses: [
      { id: "desde-cero", icon: "piano", featured: false, ribbon: null, level: "Nivel inicial", title: "Piano desde Cero", desc: "Lectura musical, postura, primeras escalas y tu primera pieza completa en 8 semanas.", duration: "8 semanas", mode: "Individual", price: 45 },
      { id: "repertorio-tecnica", icon: "compass", featured: true, ribbon: "Más elegido", level: "Nivel intermedio", title: "Repertorio & Técnica", desc: "Chopin, Debussy y piano popular latino. Trabajamos 3 piezas a tu medida con técnica avanzada.", duration: "12 semanas", mode: "Individual", price: 75 },
      { id: "improvisacion-jazz", icon: "notes", featured: false, ribbon: null, level: "Nivel avanzado", title: "Improvisación & Jazz", desc: "Armonía funcional, voicings, walking bass y cómo improvisar sobre cualquier estándar.", duration: "10 semanas", mode: "Individual", price: 85 },
      { id: "mentoria-grupal", icon: "people", featured: false, ribbon: null, level: "Todos los niveles", title: "Mentoría Grupal en Vivo", desc: "Clases grupales semanales por nivel + comunidad privada para mostrar tus avances.", duration: "Continuo", mode: "Grupal", price: 25 },
    ],

    /* ── SPOTIFY ── */
    spotifyEyebrow: "— Spotify",
    spotifyTitle: "Escucha a Jesús Molina",
    spotifySub: "Conéctate con las interpretaciones más vibrantes. Escucha sus composiciones originales, jazz fusión y solos de piano en Spotify.",
    spotifyMonthlyListeners: "Oyentes mensuales",
    spotifyFollowBtn: "Seguir en Spotify",
    spotifyVerifiedArtist: "Artista Verificado",
    spotifyQuote: '"Uno de los pianistas y multi-instrumentistas más creativos de la escena del jazz moderno internacional."',

    /* ── FEATURED ── */
    featuredEyebrow: "— Destacados",
    featuredTitle: "Moments that speak through the music",
    featuredSub: "Una selección de piezas, performances y propuestas que muestran la versatilidad de Jesús Molina, desde la energía del escenario hasta la profundidad de la improvisación.",
    featuredCta: "Reservar clase",
    featuredCard1Label: "Destacado principal",
    featuredCard1Desc: "Una pieza vibrante que reúne ritmo, energía y una presencia escénica difícil de olvidar, demostrando la capacidad de improvisación y versatilidad musical.",
    featuredCard2Label: "En escena",
    featuredCard2Desc: "Una emotiva interpretación en vivo durante la décima edición de los La Musa Awards, donde la nostalgia y el sentimiento se fusionan en cada nota.",
    featuredCard3Label: "Nueva propuesta",
    featuredCard3Desc: "El clásico de Dizzy Gillespie reimaginado con un enfoque personal, explorando nuevas texturas y dinámicas que rinden homenaje al jazz tradicional.",
    featuredListenPlatforms: "Escuchar en plataformas",

    /* ── PRICING ── */
    pricingEyebrow: "— Inversión",
    pricingTitle: "Planes claros, sin letra pequeña",
    pricingSub: "Todos los planes incluyen acceso de por vida al material grabado y garantía de 14 días.",
    pricingMonthly: "Mensual",
    pricingYearly: "Anual",
    pricingYearlyNote: "– 2 meses gratis",
    pricingPeriodMonthly: "/mes",
    pricingPeriodYearly: "/mes · facturado anual",
    pricingFootnote: "¿No estás seguro de cuál elegir?",
    pricingFootnoteLink: "Escríbeme y te recomiendo el plan según tu nivel →",
    pricingPlans: [
      { id: "esencial", featured: false, name: "Esencial", desc: "Para quien empieza desde cero y quiere bases sólidas.", monthly: 45, yearly: 38, features: ["1 clase individual por semana", "Material descargable de por vida", "Corrección de video cada 2 semanas", "Acceso a comunidad privada"], cta: "Elegir Esencial", ctaVariant: "outline" },
      { id: "intensivo", featured: true, badge: "Recomendado", name: "Intensivo", desc: "El plan de la mayoría: avance rápido con seguimiento cercano.", monthly: 75, yearly: 63, features: ["2 clases individuales por semana", "Material descargable de por vida", "Corrección de video semanal en 48h", "Acceso a comunidad privada", "Repertorio personalizado"], cta: "Elegir Intensivo", ctaVariant: "primary" },
      { id: "grupal", featured: false, name: "Mentoría Grupal", desc: "Para aprender en comunidad, con presupuesto ajustado.", monthly: 25, yearly: 21, features: ["1 clase grupal por semana (máx. 6 alumnos)", "Material descargable de por vida", "Sesión de preguntas en vivo mensual", "Acceso a comunidad privada"], cta: "Elegir Grupal", ctaVariant: "outline" },
    ],

    /* ── FINAL CTA / CONTACT ── */
    ctaEyebrow: "— Contacto",
    ctaTitle: "Hablemos",
    ctaSub: "¿Tienes alguna pregunta, propuesta de colaboración o simplemente quieres decir hola? Escríbeme y te responderé lo antes posible.",
    ctaBtn: "Enviar mensaje",
    ctaSent: "¡Enviado!",
    ctaWorldwide: "Internacional",
    ctaLabelName: "Nombre",
    ctaLabelEmail: "Correo electrónico",
    ctaLabelSubject: "Asunto",
    ctaLabelMessage: "Mensaje",
    ctaPlaceholderName: "Tu nombre",
    ctaPlaceholderEmail: "tu@correo.com",
    ctaPlaceholderSubject: "¿De qué se trata?",
    ctaPlaceholderMessage: "Cuéntame lo que tienes en mente...",

    /* ── FOOTER ── */
    footerNav: "Navegación",
    footerNavLinks: [
      { href: "/", label: "Inicio" },
      { href: "/concerts", label: "Conciertos" },
      { href: "/biography", label: "Biografía" },
      { href: "/contact", label: "Contacto" },
    ],
    footerExplore: "Explorar",
    footerExploreLinks: [
      { href: "/#spotify", label: "Spotify" },
      { href: "/#destacados", label: "Destacados" },
      { href: "/#cursos-disponibles", label: "Cursos CLAMA" },
      { href: "/#metodo", label: "Cómo Funciona" },
    ],
    footerIntro: "Piano, composición y presencia escénica para quienes quieren aprender con profundidad y sentir la música de forma auténtica.",
    footerContact: "Contacto",
    footerChannelWhatsapp: "WhatsApp",
    footerChannelInstagram: "Instagram",
    footerChannelYoutube: "YouTube",
    footerChannelSpotify: "Spotify",
    footerChannelAppleMusic: "Apple Music",
    footerScheduleClass: "Agendar clase",
    footerExploreCourses: "Explorar cursos",
    footerListenSpotify: "Escuchar en Spotify",
    footerCopyright: "© 2026 Jesús Molina. Todos los derechos reservados.",
    footerTagline: "Hecho con cuidado, nota por nota.",

    /* ── CONCERTS ── */
    concertsSubtitle: "Un recorrido visual por las giras y presentaciones en vivo de Jesús Molina alrededor del mundo.",
    concertsEyebrow2: "— En Vivo",
    concertsLiveBadge: "En vivo",
    concertsGalleryTitle: "Archivo de conciertos",
    concertsGalleryDesc: "Selecciona una presentación para ver la grabación completa en YouTube.",
    concertsWatchLive: "Ver en YouTube →",
    concertsMapTitle: "Gira Mundial",
    concertsMapDesc: "Explora las ciudades donde Jesús ha tocado en vivo. Pasa el cursor sobre cada punto para ver los detalles.",

    /* ── BIOGRAPHY ── */
    bioTitle1: "La historia detrás de la música",
    bioEyebrow2: "— Trayectoria",
    bioPortraitLabel: "Retrato editorial",
    bioTimelineTitle: "Hitos del camino",
    bioCollaboratorsTitle: "Colaboradores",
    bioCollaboratorsDesc: "Músicos y artistas con los que Jesús ha compartido escenario y estudio.",
    bioSpecsLabel: "Especificaciones",
    bioP1: "Jesús Molina, nacido en 1996 en Sincelejo, Sucre, Colombia, es un reconocido pianista de jazz, cantante y saxofonista distinguido por su excepcional habilidad técnica y notable capacidad de improvisación. Comenzó su viaje musical tocando el saxofón a los 12 años y, a los 15, decidió enfocarse principalmente en el piano, el instrumento que lo llevaría al reconocimiento internacional.",
    bioP2: "En 2016, Molina fue galardonado con la Beca Juan Luis Guerra otorgada por la Fundación Cultural Latin Grammy, lo que le permitió estudiar en el prestigioso Berklee College of Music en Boston, Massachusetts.",
    bioP3: "Su distintivo estilo musical combina el jazz con influencias de una amplia variedad de géneros y se inspira en pianistas legendarios como Oscar Peterson, Art Tatum, Erroll Garner y Bill Evans. También ha ganado gran reconocimiento por sus interpretaciones de clásicos del jazz, incluidos Spain de Chick Corea y A Night in Tunisia de Dizzy Gillespie.",
    bioP4: "A lo largo de su carrera, Molina ha actuado junto a artistas de aclamación internacional como Jesús Adrián Romero, Arturo Sandoval, Randy Brecker y Juan Luis Guerra, consolidándose como uno de los músicos contemporáneos más destacados de Colombia.",
    bioP5: "Su más reciente álbum, Selah, demuestra su versatilidad artística al combinar el piano y el saxofón soprano mientras incorpora ritmos brasileños y cubanos junto a elementos de la música árabe y hebrea. Además de su carrera en vivo, Jesús Molina ha construido una sólida presencia digital, especialmente en YouTube, donde sus videos acumulan más de 43 millones de reproducciones, reflejando el alcance global e impacto de su música.",
    bioInfluencesTitle: "Influencias Clave",
    bioInfluencesDesc: "Los gigantes que moldearon su estilo de improvisación y armonía.",
    bioInstrumentsTitle: "Sus Instrumentos",
    bioInstrumentsDesc: "Las herramientas del oficio. Cada una con su propia voz y carácter.",

    /* ── CONTACT ── */
    contactTitle: "Creemos música juntos",
    contactEyebrow2: "— Contacto",
    contactSub: "Para contrataciones, masterclasses o dudas, envíame un mensaje y te responderé en breve.",
    contactFormName: "Nombre completo",
    contactFormEmail: "Correo electrónico",
    contactFormSubject: "Asunto / Motivo",
    contactFormMessage: "Tu mensaje...",
    contactFormSelectOption: "Selecciona una opción",
    contactFormOptionHiring: "Contratación para Concierto",
    contactFormOptionMasterclass: "Masterclass / Taller",
    contactFormOptionLessons: "Clases Privadas",
    contactFormOptionOther: "Otro asunto",
    contactFormSubmit: "Enviar mensaje",
    contactFormSending: "Enviando...",
    contactFormSuccess: "¡Mensaje enviado con éxito!",
    contactFormSuccessSub: "Gracias por escribir. Te responderé en menos de 48 horas.",
    contactFormBack: "Volver al formulario",
  },

  en: {
    /* ── NAV ── */
    home: "Home",
    concerts: "Concerts",
    biography: "Biography",
    services: "Services",
    navCourses: "Courses",
    masterclass: "Masterclass",
    contact: "Contact",
    platform: "Platform",
    startNow: "Start now",
    changeLanguage: "Change language",
    platformsTitle: "Platforms",
    platformsSubtitle: "Choose your platform",
    platformsPlay: "Play",
    platformsDownload: "Download",

    /* ── HERO ── */
    heroTitle1: "Jesús",
    heroTitle2: "Molina",
    heroTitle3: "Pianist · Composer · Performer",
    heroSub: "Over 14 years on stages across 9 countries, mastering more than 5 instruments. Music is not just what I do — it's who I am.",
    heroCta1: "Discover my music",
    heroCta2: "Watch live",
    heroScrollDown: "Scroll",
    heroStat1Label: "years of career",
    heroStat2Label: "countries",
    heroStat3Label: "instruments",

    /* ── COURSES CAROUSEL ── */
    coursesCarouselEyebrow: "— CLAMA Academy",
    coursesCarouselTitle: "CLAMA COURSES",
    coursesCarouselSub: "Explore our wide variety of specialized courses designed for all levels. From piano fundamentals and classical technique to advanced harmony, jazz improvisation, and creative composition within the CLAMA platform.",
    coursesCatalogTitle: "Course Catalog",
    clamaVideoBadge: "Discover the CLAMA platform",
    viewCourse: "View course",

    /* ── METHOD ── */
    methodEyebrow: "— How it works",
    methodTitle: "Your journey, in three movements",
    methodSub: "Like a sonata: exposition, development, and recapitulation. Each course follows this same structure, so progress is felt and never guessed.",
    methodBentoBeginnerLabel: "Getting started",
    methodBentoBeginnerTitle: "Beginner level",
    methodBentoBeginnerDesc: "For students of all levels",
    methodBentoStep1: "Step 4 · Scales",
    methodBentoStep2: "Step 5 · Chords",
    methodBentoCommunityTitle: "Community",
    methodBentoCommunityDesc: "Like-minded students always ready to share progress",
    methodBentoAppLabel: "Coming soon",
    methodBentoAppTitle: "Practice app",
    methodBentoAppDesc: "Your progress, sheet music, and metrics in one place",
    methodBentoTopicsTitle: "Choose your repertoire",
    methodBentoTopicsDesc: "Customize your study plan by style",
    methodBentoTags: ["Classical", "Jazz", "Pop & Latin", "Soundtracks", "Improvisation", "Technique"],
    methodCards: [
      { mark: "I", icon: "file", title: "Assessment & foundations", desc: "We evaluate your actual level, correct posture and hand position, and establish music reading from the very first exercise — not after 10 classes.", tag: "Weeks 1–3" },
      { mark: "II", icon: "compass", title: "Guided repertoire", desc: "You choose a real piece you want to play and we work through it part by part, with feedback in every session and tailored technical exercises.", tag: "Weeks 4–10" },
      { mark: "III", icon: "star", title: "Interpretation & performance", desc: "We refine dynamics, phrasing, and expression. You finish the course with a piece ready to record, play for family, or share online.", tag: "Weeks 11–12" },
    ],
    methodShowcaseTitle: "Practice with real tracking, not just good intentions",
    methodShowcaseDesc: "Each student gets access to the practice platform: downloadable video lessons, annotated sheet music, and progress metrics by piece.",
    methodShowcaseItems: [
      "HD video lessons, available forever",
      "Digital sheet music with personalized annotations",
      "Weekly video correction, within 48 hours",
    ],
    methodPhoneProgress: "My progress",
    methodWeek: "Week 6 of 12",
    methodContinue: "Continue practice",

    /* ── COURSES ── */
    coursesEyebrow: "— Catalog",
    coursesTitle: "Choose your next piece",
    coursesSub: "Four programs, each designed for a different starting point. All include live classes, downloadable material, and personalized correction.",
    coursesSeeDetail: "See details →",
    coursesPriceUnit: "/mo",
    courses: [
      { id: "desde-cero", icon: "piano", featured: false, ribbon: null, level: "Beginner", title: "Piano from Scratch", desc: "Music reading, posture, first scales, and your first complete piece in 8 weeks.", duration: "8 weeks", mode: "Individual", price: 45 },
      { id: "repertorio-tecnica", icon: "compass", featured: true, ribbon: "Most chosen", level: "Intermediate", title: "Repertoire & Technique", desc: "Chopin, Debussy, and Latin pop piano. We work on 3 tailored pieces with advanced technique.", duration: "12 weeks", mode: "Individual", price: 75 },
      { id: "improvisacion-jazz", icon: "notes", featured: false, ribbon: null, level: "Advanced", title: "Improvisation & Jazz", desc: "Functional harmony, voicings, walking bass, and how to improvise over any standard.", duration: "10 weeks", mode: "Individual", price: 85 },
      { id: "mentoria-grupal", icon: "people", featured: false, ribbon: null, level: "All levels", title: "Live Group Mentoring", desc: "Weekly group classes by level + private community to showcase your progress.", duration: "Ongoing", mode: "Group", price: 25 },
    ],

    /* ── SPOTIFY ── */
    
    spotifyMonthlyListeners: "Monthly listeners",
    spotifyFollowBtn: "Follow on Spotify",
    spotifyVerifiedArtist: "Verified Artist",
    spotifyQuote: '"One of the most creative pianists and multi-instrumentalists in the international world wide scene."',

    /* ── FEATURED ── */
    featuredEyebrow: "— Featured",
    featuredTitle: "Moments that speak through the music",
    featuredSub: "A selection of pieces, performances, and ideas that show Jesús Molina's versatility, from stage energy to the depth of improvisation.",
    featuredCta: "Book a class",
    featuredCard1Label: "Main Highlight",
    featuredCard1Desc: "A vibrant piece bringing rhythm, energy, and an unforgettable stage presence, demonstrating musical versatility and improvisational skill.",
    featuredCard2Label: "On Stage",
    featuredCard2Desc: "An emotional live performance at the 10th edition of the La Musa Awards, where nostalgia and deep feeling merge in every single note.",
    featuredCard3Label: "New Concept",
    featuredCard3Desc: "Dizzy Gillespie's classic reimagined with a personal approach, exploring new textures and dynamics honoring traditional jazz.",
    featuredListenPlatforms: "Listen on all platforms",

    /* ── PRICING ── */
    pricingEyebrow: "— Investment",
    pricingTitle: "Clear plans, no fine print",
    pricingSub: "All plans include lifetime access to recorded material and a 14-day guarantee.",
    pricingMonthly: "Monthly",
    pricingYearly: "Annual",
    pricingYearlyNote: "– 2 months free",
    pricingPeriodMonthly: "/mo",
    pricingPeriodYearly: "/mo · billed annually",
    pricingFootnote: "Not sure which to choose?",
    pricingFootnoteLink: "Write me and I'll recommend the right plan for your level →",
    pricingPlans: [
      { id: "esencial", featured: false, name: "Essential", desc: "For those starting from scratch who want solid foundations.", monthly: 45, yearly: 38, features: ["1 individual class per week", "Downloadable material for life", "Video correction every 2 weeks", "Private community access"], cta: "Choose Essential", ctaVariant: "outline" },
      { id: "intensivo", featured: true, badge: "Recommended", name: "Intensive", desc: "The most popular plan: fast progress with close monitoring.", monthly: 75, yearly: 63, features: ["2 individual classes per week", "Downloadable material for life", "Weekly video correction in 48h", "Private community access", "Personalized repertoire"], cta: "Choose Intensive", ctaVariant: "primary" },
      { id: "grupal", featured: false, name: "Group Mentoring", desc: "To learn in community, on a budget.", monthly: 25, yearly: 21, features: ["1 group class per week (max. 6 students)", "Downloadable material for life", "Monthly live Q&A session", "Private community access"], cta: "Choose Group", ctaVariant: "outline" },
    ],

    /* ── FINAL CTA / CONTACT ── */
    ctaEyebrow: "— Contact",
    ctaTitle: "Let's Talk",
    ctaSub: "Have a question, collaboration proposal, or just want to say hello? Drop me a message and I'll get back to you as soon as possible.",
    ctaBtn: "Send message",
    ctaSent: "Sent!",
    ctaWorldwide: "Worldwide",
    ctaLabelName: "Name",
    ctaLabelEmail: "Email",
    ctaLabelSubject: "Subject",
    ctaLabelMessage: "Message",
    ctaPlaceholderName: "Your name",
    ctaPlaceholderEmail: "your@email.com",
    ctaPlaceholderSubject: "What is this about?",
    ctaPlaceholderMessage: "Tell me what you have in mind...",

    /* ── FOOTER ── */
    footerNav: "Navigation",
    footerNavLinks: [
      { href: "/", label: "Home" },
      { href: "/concerts", label: "Concerts" },
      { href: "/biography", label: "Biography" },
      { href: "/contact", label: "Contact" },
    ],
    footerExplore: "Explore",
    footerExploreLinks: [
      { href: "/#spotify", label: "Spotify" },
      { href: "/#destacados", label: "Featured" },
      { href: "/#cursos-disponibles", label: "CLAMA Courses" },
      { href: "/#metodo", label: "How It Works" },
    ],
    footerIntro: "Piano, composition, and stage presence for those who want to learn with depth and feel music in an authentic way.",
    footerContact: "Contact",
    footerChannelWhatsapp: "WhatsApp",
    footerChannelInstagram: "Instagram",
    footerChannelYoutube: "YouTube",
    footerChannelSpotify: "Spotify",
    footerChannelAppleMusic: "Apple Music",
    footerScheduleClass: "Book a class",
    footerExploreCourses: "Explore courses",
    footerListenSpotify: "Listen on Spotify",
    footerCopyright: "© 2026 Jesús Molina. All rights reserved.",
    footerTagline: "Made with care, note by note.",

    /* ── CONCERTS ── */
    concertsSubtitle: "A visual journey through Jesús Molina's tours and live performances around the world.",
    concertsEyebrow2: "— Live Shows",
    concertsLiveBadge: "Live",
    concertsGalleryTitle: "Concert archive",
    concertsGalleryDesc: "Select a performance to watch the full recording on YouTube.",
    concertsWatchLive: "Watch on YouTube →",
    concertsMapTitle: "World Tour",
    concertsMapDesc: "Explore the cities where Jesús has performed live. Hover over each point for details.",

    /* ── BIOGRAPHY ── */
    bioTitle1: "The story behind the music",
    bioEyebrow2: "— Journey",
    bioPortraitLabel: "Editorial portrait",
    bioTimelineTitle: "Milestones",
    bioCollaboratorsTitle: "Collaborators",
    bioCollaboratorsDesc: "Musicians and artists Jesús has shared the stage and studio with.",
    bioSpecsLabel: "Specifications",
    bioP1: "Jesús Molina, born in 1996 in Sincelejo, Sucre, Colombia, is a renowned jazz pianist, singer, and saxophonist recognized for his exceptional technical skill and remarkable improvisational ability. He began his musical journey by playing the saxophone at the age of 12 and, at 15, decided to focus primarily on the piano, the instrument that would lead him to international recognition.",
    bioP2: "In 2016, Molina was awarded the Juan Luis Guerra Scholarship by the Latin Grammy Cultural Foundation, enabling him to study at the prestigious Berklee College of Music in Boston, Massachusetts.",
    bioP3: "His distinctive musical style blends jazz with influences from a wide variety of genres and draws inspiration from legendary pianists such as Oscar Peterson, Art Tatum, Erroll Garner, and Bill Evans. He has also gained widespread recognition for his interpretations of jazz classics, including Spain by Chick Corea and A Night in Tunisia by Dizzy Gillespie.",
    bioP4: "Throughout his career, Molina has performed alongside internationally acclaimed artists such as Jesús Adrián Romero, Arturo Sandoval, Randy Brecker, and Juan Luis Guerra, establishing himself as one of Colombia's most prominent contemporary musicians.",
    bioP5: "His latest album, Selah, showcases his artistic versatility by combining piano and soprano saxophone while incorporating Brazilian and Cuban rhythms alongside elements of Arabic and Hebrew music. In addition to his performance career, Jesús Molina has built a strong digital presence, particularly on YouTube, where his videos have accumulated more than 43 million views, reflecting the global reach and impact of his music.",
    bioInfluencesTitle: "Key Influences",
    bioInfluencesDesc: "The giants who shaped his style of improvisation and harmony.",
    bioInstrumentsTitle: "His Instruments",
    bioInstrumentsDesc: "The tools of the trade. Each with its own voice and character.",

    /* ── CONTACT ── */
    contactTitle: "Let's make music together",
    contactEyebrow2: "— Get in touch",
    contactSub: "For bookings, masterclasses, or inquiries, send me a message and I'll get back to you shortly.",
    contactFormName: "Full name",
    contactFormEmail: "Email address",
    contactFormSubject: "Subject / Reason",
    contactFormMessage: "Your message...",
    contactFormSelectOption: "Select an option",
    contactFormOptionHiring: "Concert Booking",
    contactFormOptionMasterclass: "Masterclass / Workshop",
    contactFormOptionLessons: "Private Lessons",
    contactFormOptionOther: "Other Inquiry",
    contactFormSubmit: "Send message",
    contactFormSending: "Sending...",
    contactFormSuccess: "Message sent successfully!",
    contactFormSuccessSub: "Thank you for writing. I will reply to you in less than 48 hours.",
    contactFormBack: "Back to form",
  },

  fr: {
    /* ── NAV ── */
    home: "Accueil",
    concerts: "Concerts",
    biography: "Biographie",
    services: "Services",
    navCourses: "Cours",
    masterclass: "Masterclass",
    contact: "Contact",
    platform: "Plateforme",
    startNow: "Commencer",
    changeLanguage: "Changer de langue",
    platformsTitle: "Plateformes",
    platformsSubtitle: "Choisissez votre plateforme",
    platformsPlay: "Play",
    platformsDownload: "Télécharger",

    /* ── HERO ── */
    heroTitle1: "Jesús",
    heroTitle2: "Molina",
    heroTitle3: "Pianiste · Compositeur · Interprète",
    heroSub: "Plus de 14 ans sur les scènes de 9 pays, maîtrisant plus de 5 instruments. La musique n'est pas seulement ce que je fais — c'est ce que je suis.",
    heroCta1: "Découvrez ma musique",
    heroCta2: "Voir en direct",
    heroScrollDown: "Défiler",
    heroStat1Label: "ans de carrière",
    heroStat2Label: "pays",
    heroStat3Label: "instruments",

    /* ── COURSES CAROUSEL ── */
    coursesCarouselEyebrow: "— Cours disponibles",
    coursesCarouselTitle: "Apprenez depuis n'importe quelle plateforme",
    coursesCarouselSub: "Les programmes de piano de Jesús Molina publiés sur les principales plateformes d'apprentissage du monde. Apprenez à votre rythme.",

    /* ── METHOD ── */
    methodEyebrow: "— Comment ça fonctionne",
    methodTitle: "Votre parcours, en trois mouvements",
    methodSub: "Comme une sonate : exposition, développement et récapitulation. Chaque cours suit cette même structure, pour que les progrès soient ressentis et non devinés.",
    methodBentoBeginnerLabel: "Pour commencer",
    methodBentoBeginnerTitle: "Niveau débutant",
    methodBentoBeginnerDesc: "Pour les élèves de tous niveaux",
    methodBentoStep1: "Étape 4 · Gammes",
    methodBentoStep2: "Étape 5 · Accords",
    methodBentoCommunityTitle: "Communauté",
    methodBentoCommunityDesc: "Des élèves partageant les mêmes idées, prêts à partager leurs progrès",
    methodBentoAppLabel: "Bientôt disponible",
    methodBentoAppTitle: "Application de pratique",
    methodBentoAppDesc: "Vos progrès, partitions et métriques en un seul endroit",
    methodBentoTopicsTitle: "Choisissez votre répertoire",
    methodBentoTopicsDesc: "Personnalisez votre plan d'étude par style",
    methodBentoTags: ["Classique", "Jazz", "Pop & Latin", "Bandes sonores", "Improvisation", "Technique"],
    methodCards: [
      { mark: "I", icon: "file", title: "Évaluation & bases", desc: "Nous évaluons votre niveau réel, corrigeons la posture et la main, et établissons la lecture musicale dès le premier exercice — pas après 10 cours.", tag: "Semaines 1–3" },
      { mark: "II", icon: "compass", title: "Répertoire guidé", desc: "Vous choisissez un vrai morceau à jouer et nous le travaillons partie par partie, avec des retours à chaque séance et des exercices techniques adaptés.", tag: "Semaines 4–10" },
      { mark: "III", icon: "star", title: "Interprétation & scène", desc: "Nous peaufinons la dynamique, le phrasé et l'expression. Vous terminez le cours avec un morceau prêt à enregistrer, jouer en famille ou partager en ligne.", tag: "Semaines 11–12" },
    ],
    methodShowcaseTitle: "Pratiquez avec un suivi réel, pas seulement de la bonne volonté",
    methodShowcaseDesc: "Chaque élève a accès à la plateforme de pratique : vidéos téléchargeables, partitions annotées et métriques de progression par morceau.",
    methodShowcaseItems: [
      "Vidéos HD disponibles à vie",
      "Partitions numériques avec annotations personnalisées",
      "Correction vidéo hebdomadaire, en moins de 48h",
    ],
    methodPhoneProgress: "Mes progrès",
    methodWeek: "Semaine 6 sur 12",
    methodContinue: "Continuer la pratique",

    /* ── COURSES ── */
    coursesEyebrow: "— Catalogue",
    coursesTitle: "Choisissez votre prochain morceau",
    coursesSub: "Quatre programmes, chacun conçu pour un point de départ différent. Tous incluent des cours en direct, du matériel téléchargeable et une correction personnalisée.",
    coursesSeeDetail: "Voir les détails →",
    coursesPriceUnit: "/mois",
    courses: [
      { id: "depuis-zero", icon: "piano", featured: false, ribbon: null, level: "Débutant", title: "Piano de Zéro", desc: "Lecture musicale, posture, premières gammes et votre premier morceau complet en 8 semaines.", duration: "8 semaines", mode: "Individuel", price: 45 },
      { id: "repertoire-technique", icon: "compass", featured: true, ribbon: "Le plus choisi", level: "Intermédiaire", title: "Répertoire & Technique", desc: "Chopin, Debussy et piano pop latin. Nous travaillons 3 morceaux adaptés avec technique avancée.", duration: "12 semaines", mode: "Individuel", price: 75 },
      { id: "improvisation-jazz", icon: "notes", featured: false, ribbon: null, level: "Avancé", title: "Improvisation & Jazz", desc: "Harmonie fonctionnelle, voicings, walking bass et comment improviser sur n'importe quel standard.", duration: "10 semaines", mode: "Individuel", price: 85 },
      { id: "mentorat-groupe", icon: "people", featured: false, ribbon: null, level: "Tous niveaux", title: "Mentorat en Groupe en Direct", desc: "Cours de groupe hebdomadaires par niveau + communauté privée pour montrer vos progrès.", duration: "Continu", mode: "Groupe", price: 25 },
    ],

    /* ── SPOTIFY ── */
    spotifyEyebrow: "— Spotify",
    spotifyTitle: "Écoutez Jesús Molina",
    spotifySub: "Connectez-vous avec les performances de piano les plus vibrantes. Écoutez ses compositions originales, sa fusion de jazz et ses solos de piano sur Spotify.",
    spotifyMonthlyListeners: "Auditeurs mensuels",
    spotifyFollowBtn: "Suivre sur Spotify",

    /* ── FEATURED ── */
    featuredEyebrow: "— En vedette",
    featuredTitle: "Moments that speak through the music",
    featuredSub: "Une sélection de pièces, performances et propositions qui montrent la polyvalence de Jesús Molina, de l'énergie de scène à la profondeur de l'improvisation.",
    featuredCta: "Réserver un cours",

    /* ── PRICING ── */
    pricingEyebrow: "— Investissement",
    pricingTitle: "Des plans clairs, sans petits caractères",
    pricingSub: "Tous les plans incluent l'accès à vie au matériel enregistré et une garantie de 14 jours.",
    pricingMonthly: "Mensuel",
    pricingYearly: "Annuel",
    pricingYearlyNote: "– 2 mois gratuits",
    pricingPeriodMonthly: "/mois",
    pricingPeriodYearly: "/mois · facturé annuellement",
    pricingFootnote: "Vous ne savez pas lequel choisir ?",
    pricingFootnoteLink: "Écrivez-moi et je vous recommande le plan selon votre niveau →",
    pricingPlans: [
      { id: "essentiel", featured: false, name: "Essentiel", desc: "Pour ceux qui débutent de zéro et veulent des bases solides.", monthly: 45, yearly: 38, features: ["1 cours individuel par semaine", "Matériel téléchargeable à vie", "Correction vidéo toutes les 2 semaines", "Accès à la communauté privée"], cta: "Choisir Essentiel", ctaVariant: "outline" },
      { id: "intensif", featured: true, badge: "Recommandé", name: "Intensif", desc: "Le plan de la majorité : progression rapide avec un suivi étroit.", monthly: 75, yearly: 63, features: ["2 cours individuels par semaine", "Matériel téléchargeable à vie", "Correction vidéo hebdomadaire en 48h", "Accès à la communauté privée", "Répertoire personnalisé"], cta: "Choisir Intensif", ctaVariant: "primary" },
      { id: "groupe", featured: false, name: "Mentorat en Groupe", desc: "Pour apprendre en communauté, avec un budget ajusté.", monthly: 25, yearly: 21, features: ["1 cours de groupe par semaine (max. 6 élèves)", "Matériel téléchargeable à vie", "Séance de questions en direct mensuelle", "Accès à la communauté privée"], cta: "Choisir Groupe", ctaVariant: "outline" },
    ],

    /* ── FINAL CTA / CONTACT ── */
    ctaEyebrow: "— Contact",
    ctaTitle: "Parlons",
    ctaSub: "Vous avez une question, une proposition de collaboration ou simplement envie de dire bonjour ? Envoyez-moi un message et je vous répondrai dès que possible.",
    ctaBtn: "Envoyer le message",
    ctaSent: "Envoyé !",
    ctaWorldwide: "International",
    ctaLabelName: "Nom",
    ctaLabelEmail: "E-mail",
    ctaLabelSubject: "Sujet",
    ctaLabelMessage: "Message",
    ctaPlaceholderName: "Votre nom",
    ctaPlaceholderEmail: "votre@email.com",
    ctaPlaceholderSubject: "De quoi s'agit-il ?",
    ctaPlaceholderMessage: "Dites-moi ce que vous avez en tête...",

    /* ── FOOTER ── */
    footerNav: "Navigation",
    footerNavLinks: [
      { href: "/", label: "Accueil" },
      { href: "/concerts", label: "Concerts" },
      { href: "/biography", label: "Biographie" },
      { href: "/contact", label: "Contact" },
    ],
    footerExplore: "Explorer",
    footerExploreLinks: [
      { href: "/#spotify", label: "Spotify" },
      { href: "/#destacados", label: "En vedette" },
      { href: "/#cursos-disponibles", label: "Cours CLAMA" },
      { href: "/#metodo", label: "Comment ça marche" },
    ],
    footerIntro: "Piano, composition et présence scénique pour ceux qui veulent apprendre en profondeur et ressentir la musique de manière authentique.",
    footerContact: "Contact",
    footerChannelWhatsapp: "WhatsApp",
    footerChannelInstagram: "Instagram",
    footerChannelYoutube: "YouTube",
    footerChannelSpotify: "Spotify",
    footerChannelAppleMusic: "Apple Music",
    footerScheduleClass: "Réserver un cours",
    footerExploreCourses: "Explorer les cours",
    footerListenSpotify: "Écouter sur Spotify",
    footerCopyright: "© 2026 Jesús Molina. Tous droits réservés.",
    footerTagline: "Fait avec soin, note par note.",

    /* ── CONCERTS ── */
    concertsSubtitle: "Un parcours visuel à travers les tournées et performances live de Jesús Molina dans le monde.",
    concertsEyebrow2: "— En Direct",
    concertsLiveBadge: "En direct",
    concertsGalleryTitle: "Archives de concerts",
    concertsGalleryDesc: "Sélectionnez une performance pour voir l'enregistrement complet sur YouTube.",
    concertsWatchLive: "Voir sur YouTube →",
    concertsMapTitle: "Tournée Mondiale",
    concertsMapDesc: "Explorez les villes où Jesús s'est produit en live. Survolez chaque point pour les détails.",

    /* ── BIOGRAPHY ── */
    bioTitle1: "L'histoire derrière la musique",
    bioEyebrow2: "— Parcours",
    bioPortraitLabel: "Portrait éditorial",
    bioTimelineTitle: "Jalons du parcours",
    bioCollaboratorsTitle: "Collaborateurs",
    bioCollaboratorsDesc: "Musiciens et artistes avec lesquels Jesús a partagé la scène et le studio.",
    bioSpecsLabel: "Spécifications",
    bioP1: "Jesús Molina, né en 1996 à Sincelejo, Sucre, Colombie, est un pianiste de jazz, chanteur et saxophoniste de renom reconnu pour son habileté technique exceptionnelle et sa remarquable capacité d'improvisation. Il a commencé son parcours musical en jouant du saxo à 12 ans et, à 15 ans, a décidé de se concentrer principalement sur le piano, l'instrument qui le mènerait à la reconnaissance internationale.",
    bioP2: "En 2016, Molina a reçu la bourse Juan Luis Guerra de la Latin Grammy Cultural Foundation, lui permettant d'étudier au prestigieux Berklee College of Music à Boston, Massachusetts.",
    bioP3: "Son style musical distinctif mêle le jazz à des influences variées et s'inspire de pianistes légendaires tels qu'Oscar Peterson, Art Tatum, Erroll Garner et Bill Evans. Il a également acquis une grande renommée pour ses interprétations de classiques du jazz, notamment Spain de Chick Corea et A Night in Tunisia de Dizzy Gillespie.",
    bioP4: "Tout au long de sa carrière, Molina s'est produit aux côtés d'artistes de renommée internationale tels que Jesús Adrián Romero, Arturo Sandoval, Randy Brecker et Juan Luis Guerra, s'imposant comme l'un des musiciens contemporains les plus en vue de Colombie.",
    bioP5: "Son dernier album, Selah, illustre sa polyvalence artistique en combinant piano et saxo soprano tout en intégrant des rythmes brésiliens et cubains ainsi que des éléments de musique arabe et hébraïque. En plus de sa carrière de scène, Jesús Molina a développé une forte présence numérique, notamment sur YouTube où ses vidéos accumulent plus de 43 millions de vues, reflétant la portée mondiale et l'impact de sa musique.",
    bioInfluencesTitle: "Influences Clés",
    bioInfluencesDesc: "Les géants qui ont façonné son style d'improvisation et d'harmonie.",
    bioInstrumentsTitle: "Ses Instruments",
    bioInstrumentsDesc: "Les outils du métier. Chacun avec sa propre voix et son propre caractère.",

    /* ── CONTACT ── */
    contactTitle: "Créons de la musique ensemble",
    contactEyebrow2: "— Contact",
    contactSub: "Pour les réservations, masterclass ou demandes de renseignements, envoyez-moi un message y je vous répondrai sous peu.",
    contactFormName: "Nom complet",
    contactFormEmail: "Adresse e-mail",
    contactFormSubject: "Sujet / Motif",
    contactFormMessage: "Votre message...",
    contactFormSelectOption: "Sélectionnez une option",
    contactFormOptionHiring: "Réservation de Concert",
    contactFormOptionMasterclass: "Masterclass / Atelier",
    contactFormOptionLessons: "Cours Privés",
    contactFormOptionOther: "Autre demande",
    contactFormSubmit: "Envoyer le message",
    contactFormSending: "Envoi en cours...",
    contactFormSuccess: "Message envoyé avec succès !",
    contactFormSuccessSub: "Merci de m'avoir écrit. Je vous répondrai dans moins de 48 heures.",
    contactFormBack: "Retour au formulaire",
  },
};

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.body.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  const t = translations[language];

  return (
    <AppContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
