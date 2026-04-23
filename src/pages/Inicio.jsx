// React
import { useState } from "react";

// Components
import Footer from "../components/Footer.jsx";

// Libraries
import { motion, AnimatePresence } from "framer-motion";

// Styles
import "../styles/inicio.css";

// Fondos
import fondo from "../assets/img/fondo-inicio-actiFinal.png";

// Img
import img1 from "../assets/img/inicio-img1.png";
import img2 from "../assets/img/inicio-img2.png";
import img3 from "../assets/img/inicio-img3.png";
import img4 from "../assets/img/inicio-img4.png";
import img5 from "../assets/img/inicio-img5.png";

const imagesCarousel = [img1, img2, img3, img4, img5];

export default function Inicio() {
  const [selectedTab, setSelectedTab] = useState("bucles");
  const [currentImage, setCurrentImage] = useState(0);

  const TABS = {
    BUCLES: "bucles",
    BUCLE_FOR: "bucleFor",
    BUCLE_WHILE: "bucleWhile",
  };

  const tabsContent = {
    bucles: [
      {
        titulo: "Los videojuegos están llenos de bucles:",
        descripcion:
          'Cada segundo un videojuego moderno se ejecuta dentro de un "game loop" que actualiza la lógica, detecta entradas del jugador y renderiza gráficos. Sin bucles, no habría acción continua.',
      },
      {
        titulo:
          "El bucle más largo jamás ejecutado… podría estar corriendo ahora:",
        descripcion:
          "Algunos servidores ejecutan bucles que nunca terminan, como los que gestionan redes, correos o sensores. Están diseñados para funcionar indefinidamente, ¡como un corazón digital latiendo sin parar!",
      },
      {
        titulo: "Un bucle puede congelar tu computadora:",
        descripcion:
          "Los famosos bucles infinitos ocurren cuando la condición nunca se vuelve falsa. Esto puede hacer que un programa consuma todos los recursos del sistema. ¡Un error clásico de principiantes!",
      },
    ],
    bucleFor: [
      {
        titulo: "Nació por pura repetición:",
        descripcion:
          "El bucle for surgió porque los programadores estaban cansados de escribir estructuras repetitivas con while. En los años 60, lenguajes como ALGOL lo introdujeron como una forma más elegante de repetir acciones un número determinado de veces.",
      },
      {
        titulo: "¡Puedes escribirlo sin escribir nada!:",
        descripcion:
          'En lenguajes como C o JavaScript, puedes escribir "for(;;)" y crear un bucle infinito. No hay inicialización, ni condición, ni incremento… solo un ciclo eterno. Es como un hechizo sin fin.',
      },
      {
        titulo: "Es como un combo de tres instrucciones:",
        descripcion:
          "El for agrupa tres partes: inicialización, condición y actualización. Aunque parece simple, esta estructura puede ser confusa para quienes recién comienzan, ¡y da lugar a combinaciones muy creativas (o caóticas) si se usan mal!",
      },
    ],
    bucleWhile: [
      {
        titulo: "Puede no ejecutarse nunca:",
        descripcion:
          "A diferencia del bucle for, el bucle while evalúa la condición antes de entrar. Si la condición es falsa desde el inicio, el código dentro del bucle jamás se ejecuta. Es como un portero que no deja pasar si no hay invitación.",
      },
      {
        titulo: "Es el favorito para validar entradas:",
        descripcion:
          "¿Contraseña incorrecta? ¿Número fuera de rango? El while es ideal para repetir preguntas hasta que el usuario dé una respuesta válida. ¡Es el guardián de la lógica interactiva!",
      },
      {
        titulo: "Puede simular comportamientos humanos:",
        descripcion:
          'En simulaciones, el while se usa para representar decisiones repetitivas: "mientras esté lloviendo, quédate en casa", "mientras no haya comida, busca alimento". ¡Una forma de modelar lógica de supervivencia!',
      },
    ],
  };

  const carouselImages = [
    {
      titulo: "Simulación de fenómenos físicos",
      descripcion:
        "Los bucles modelan procesos como caída libre, oscilaciones o trayectorias. Ejemplo: la caída de un balón desde un tercer piso.",
    },
    {
      titulo: "Resolución de problemas matemáticos",
      descripcion:
        "Los bucles modelan procesos como reproducción celular, crecimiento poblacional o ciclos de vida.",
    },
    {
      titulo: "Composición musical algorítmica",
      descripcion:
        "Los bucles generan secuencias rítmicas o melódicas. Ejemplo: en Sonic Pi o Scratch repetir una nota para crear ritmo.",
    },
    {
      titulo: "Simulación de ciclos vitales",
      descripcion:
        "Los bucles modelan procesos como reproducción celular, crecimiento poblacional o ciclos de vida.",
    },
    {
      titulo: "Simulación de fenómenos climáticos",
      descripcion:
        "Los bucles permiten simular cambios de temperatura, lluvias o vientos. Ejemplo: variación de temperatura diaria.",
    },
  ];

  const handlePrevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div
      className="page-inicio page-container"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-inicio__title page-title">
        Aquí comienza nuestra aventura
      </h2>

      <p className="page-inicio__description page-description">
        A continuación, observarás un listado con algunos datos curiosos sobre
        los bucles a nivel general y también sobre dos tipos de bucles que
        exploraremos a lo largo de este recurso.
      </p>

      <div className="page-inicio__tabs btn-grid">
        <button
          onClick={() => setSelectedTab(TABS.BUCLES)}
          className={`page-inicio__tab-btn btn-standard ${selectedTab === TABS.BUCLES ? "selected" : ""}`}
        >
          Bucles en la programación
        </button>
        <button
          onClick={() => setSelectedTab(TABS.BUCLE_FOR)}
          className={`page-inicio__tab-btn btn-standard ${selectedTab === TABS.BUCLE_FOR ? "selected" : ""}`}
        >
          Bucle for
        </button>
        <button
          onClick={() => setSelectedTab(TABS.BUCLE_WHILE)}
          className={`page-inicio__tab-btn btn-standard ${selectedTab === TABS.BUCLE_WHILE ? "selected" : ""}`}
        >
          Bucle while
        </button>
      </div>

      <div className="page-inicio__tab-content content-box">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeIn" }}
            className="page-inicio__tab-items"
          >
            {tabsContent[selectedTab].map((item, index) => (
              <div key={index} className="page-inicio__tab-item">
                <span className="page-inicio__tab-item-text">
                  <strong>{item.titulo}</strong> {item.descripcion}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="page-inicio__carousel-description page-description">
        Ahora observa cada imagen del carrusel y lee en qué situaciones podemos
        implementar el uso de bucles con Scratch.
      </p>

      <div className="page-inicio__carousel">
        <button
          onClick={handlePrevImage}
          className="page-inicio__carousel-btn page-inicio__carousel-btn--prev"
        >
          ‹
        </button>

        <div className="page-inicio__carousel-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="page-inicio__carousel-slide"
            >
              <div className="page-inicio__carousel-image">
                <img src={imagesCarousel[currentImage]} alt="" />
              </div>
              <h3 className="page-inicio__carousel-title">
                {carouselImages[currentImage].titulo}
              </h3>
              <p className="page-inicio__carousel-text">
                {carouselImages[currentImage].descripcion}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNextImage}
          className="page-inicio__carousel-btn page-inicio__carousel-btn--next"
        >
          ›
        </button>
      </div>

      <div className="page-inicio__carousel-indicators">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`page-inicio__carousel-indicator ${index === currentImage ? "active" : ""}`}
          />
        ))}
      </div>

      <p className="page-inicio__video-description page-description">
        Finalmente, debes ver este video para comprender la interfaz de Scratch
        y las herramientas que incluyen al momento de crear proyectos.
      </p>

      <div className="page-inicio__video">
        <iframe
          className="page-inicio__video-embed"
          src="https://www.youtube.com/embed/pPueIUrLeVs"
          title="Conoce la interfaz de SCRATCH – Capítulo 2"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <p className="page-inicio__citation">
        Tomado de: Academia JAF. (2022). Conoce la interfaz de SCRATCH –
        Capítulo 2 [Video]. YouTube.{" "}
        <a
          href="https://www.youtube.com/watch?v=pPueIUrLeVs"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.youtube.com/watch?v=pPueIUrLeVs
        </a>
      </p>

      {/*Aca va el AR*/}

      <Footer />
    </div>
  );
}
