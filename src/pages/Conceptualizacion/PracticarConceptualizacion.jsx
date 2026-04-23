// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Footer from "../../components/Footer.jsx";

// Libraries
import { motion, AnimatePresence } from "framer-motion";

// Styles
import "../../styles/common.css";

// Fondo
import fondo from "../../assets/img/fondo-conceptualizacion.png";

// Img
import imgConcep1 from "../../assets/img/concept-1.jpeg";
import imgConcep2 from "../../assets/img/concept-2.jpeg";
import imgConcep3 from "../../assets/img/concept-3.jpeg";
import imgConcep4 from "../../assets/img/concept-4.jpeg";
import imgConcep5 from "../../assets/img/concept-5.jpeg";
import imgConcep6 from "../../assets/img/concept-6.jpeg";
import imgConcep7 from "../../assets/img/concept-7.jpeg";
import imgConcep8 from "../../assets/img/concept-8.jpeg";
import imgConcep9 from "../../assets/img/concept-9.jpeg";
import imgCamara from "../../assets/img/camara.png";
import imgScanner from "../../assets/img/escanear.png";
import imgAyuda from "../../assets/img/ayuda.png";
import imgSolucion from "../../assets/img/solucion.png";

export default function PracticarConceptualizacion() {
  const [feedbackVisible, setFeedbackVisible] = useState({
    nivel1: false,
    nivel2: false,
    nivel3: false,
    nivel4: false,
    nivel5: false,
    nivel6: false,
    nivel7: false,
    nivel8: false,
    nivel9: false,
    nivel10: false,
  });
  // markerModal keeps track of which level is open and which type (1 or 2)
  const [markerModal, setMarkerModal] = useState({ nivel: null, tipo: 1 });
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  const toggleFeedback = (nivel) => {
    setFeedbackVisible((prev) => ({
      ...prev,
      [nivel]: prev[nivel] ? prev[nivel] : true,
    }));
  };

  const openMarkerModal = (nivel, tipo = 1) => setMarkerModal({ nivel, tipo });
  const closeMarkerModal = () => setMarkerModal({ nivel: null, tipo: 1 });

  const openAdvanceModal = () => setShowAdvanceModal(true);
  const closeAdvanceModal = () => setShowAdvanceModal(false);

  const niveles = [
    {
      id: "nivel1",
      titulo: "Nivel 1: Primer paso hacia la programación",
      enunciado: "Haz que tu personaje avance 10 pasos al iniciar el programa.",
      retroalimentacion:
        "Aquí ejecutaste un movimiento sencillo, comprendiendo cómo los bloques permiten que el personaje avance en el escenario. Reconociste la importancia de iniciar con un evento y dar acción al código. ¡Muy bien! Estás aprendiendo a controlar el movimiento con precisión.",
      img: imgConcep1,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-1.png",
    },
    {
      id: "nivel2",
      titulo: "Nivel 2: El saludo que se repite",
      enunciado: "Haz que tu personaje repita un saludo varias veces.",
      retroalimentacion:
        "Aquí exploraste cómo usar la repetición para que el personaje diga un mensaje varias veces. Comprendiste que repetir acciones permite automatizar comportamientos y ahorrar bloques en tu programa. ¡Muy bien! Estás dando tus primeros pasos en el uso de ciclos.",
      img: imgConcep2,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-2.png",
    },
    {
      id: "nivel3",
      titulo: "Nivel 3: Aprendiendo a contar con código",
      enunciado: "Haz que tu personaje cuente del 1 al 10.",
      retroalimentacion:
        "Aquí aprendiste a organizar acciones en un orden lógico. Entendiste cómo una secuencia permite que el personaje muestre números de forma progresiva. ¡Excelente trabajo! Estás desarrollando el pensamiento lógico en programación.",
      img: imgConcep3,
      imgMarker: "/markers-img/marker-e.png",
      imgMarkerSolution: "/markers-img/marker-3.png",
    },
    {
      id: "nivel4",
      titulo: "Nivel 4: Un pequeño giro, un gran paso",
      enunciado: "Haz que tu personaje gire 10 grados.",
      retroalimentacion:
        "Aquí exploraste cómo el personaje cambia de orientación al girar. Comprendiste que los bloques de rotación modifican la dirección y enriquecen la animación. ¡Excelente trabajo! Estás descubriendo cómo dar dinamismo a tus programas.",
      img: imgConcep4,
      imgMarker: "/markers-img/marker-c.png",
      imgMarkerSolution: "/markers-img/marker-4.png",
    },
    {
      id: "nivel5",
      titulo: "Nivel 5: Cambio de estilo en acción",
      enunciado: "Haz que tu personaje cambie de disfraz.",
      retroalimentacion:
        "En esta actividad descubriste cómo un personaje puede transformarse visualmente. Comprendiste que cambiar de disfraz ayuda a simular movimiento y expresar acciones. ¡Muy bien hecho! Tus programas ahora son más expresivos.",
      img: imgConcep5,
      imgMarker: "/markers-img/marker-b.png",
      imgMarkerSolution: "/markers-img/marker-5.png",
    },
    {
      id: "nivel6",
      titulo: "Nivel 6: Explorando el escenario",
      enunciado:
        "Haz que tu personaje se ubique en coordenadas específicas del escenario.",
      retroalimentacion:
        "Aquí aprendiste cómo funcionan las coordenadas en el escenario. Comprendiste que la posición del personaje depende de los valores de X y Y. ¡Excelente trabajo! Ahora tienes mayor control sobre el movimiento y la ubicación.",
      img: imgConcep6,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-6.png",
    },
    {
      id: "nivel7",
      titulo: "Nivel 7: Girando sin parar",
      enunciado: "Haz que tu personaje realice giros.",
      retroalimentacion:
        "En esta actividad exploraste movimientos continuos y circulares. Entendiste que los giros repetidos crean animaciones más llamativas. ¡Buen trabajo! Estás combinando movimientos para lograr mejores efectos visuales.",
      img: imgConcep7,
      imgMarker: "/markers-img/marker-c.png",
      imgMarkerSolution: "/markers-img/marker-7.png",
    },
    {
      id: "nivel8",
      titulo: "Nivel 8: Colores en movimiento",
      enunciado: "Haz que tu personaje cambie de color.",
      retroalimentacion:
        "Aquí descubriste cómo modificar la apariencia del personaje usando colores. Comprendiste que estos cambios hacen más atractiva la animación y ayudan a comunicar acciones. ¡Excelente! Tus proyectos ahora tienen más vida.",
      img: imgConcep8,
      imgMarker: "/markers-img/marker-b.png",
      imgMarkerSolution: "/markers-img/marker-8.png",
    },
    {
      id: "nivel9",
      titulo: "Nivel 9: Preparados, listos… ¡ya!",
      enunciado: "Haz que tu personaje realice una cuenta regresiva.",
      retroalimentacion:
        "En esta actividad aprendiste a organizar números en orden descendente. Comprendiste cómo una cuenta regresiva puede usarse para iniciar acciones o juegos. ¡Muy bien! Estás aplicando la lógica de control del tiempo en programación.",
      img: imgConcep9,
      imgMarker: "/markers-img/marker-b.png",
      imgMarkerSolution: "/markers-img/marker-9.png",
    },
    {
      id: "nivel10",
      titulo: "Nivel 10: Mini animación",
      enunciado:
        "Crea una animación en Scratch donde un personaje primero gire varias veces, luego cambie de colores y finalmente muestre en pantalla la cuenta del 1 al 10.",
      retroalimentacion:
        "Aquí creaste una animación sencilla cambiando disfraces en secuencia. Reconociste que los bucles permiten dar continuidad y fluidez a las imágenes. ¡Excelente trabajo! Estás programando con creatividad y ritmo visual.",
      imgMarker: "/markers-img/marker-f.png",
      imgMarkerSolution: null,
    },
  ];

  return (
    <div
      className="page-practicar-conceptualizacion page-container page-container--with-padding"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-practicar-conceptualizacion__title page-title">
        Llegó la hora de practicar
      </h2>

      <p className="page-practicar-conceptualizacion__description page-subtitle">
        Encontrarás 10 niveles de actividades diseñadas para ayudarte a aprender
        y comprender qué es un bucle en programación.
      </p>

      <div className="page-practicar-conceptualizacion__niveles card-list">
        {niveles.map((nivel) => (
          <div
            key={nivel.id}
            className="page-practicar-conceptualizacion__nivel-card card"
          >
            <div className="page-practicar-conceptualizacion__nivel-header">
              {/* secondary scanner button only if there is a solution marker and not level 10 */}
              {nivel.id !== "nivel10" && (
                <div className="btn-scanner-solution-wrapper">
                  <button
                    type="button"
                    className="btn-scanner-card btn-scanner-card--left"
                    onClick={() => openMarkerModal(nivel, 2)}
                    disabled={!nivel.imgMarkerSolution}
                  >
                    <img src={imgSolucion} alt="Escáner 2" />
                  </button>
                  <span className="btn-scanner-solution-label">
                    Haz click cuando hayas completado el ejercicio
                  </span>
                </div>
              )}

              <h3 className="page-practicar-conceptualizacion__nivel-title card__title">
                {nivel.titulo}
              </h3>

              {/* primary scanner for the main marker */}
              <button
                type="button"
                className="btn-scanner-card"
                onClick={() => openMarkerModal(nivel, 1)}
              >
                <img src={imgScanner} alt="Escáner" />
              </button>
            </div>

            <p className="page-practicar-conceptualizacion__nivel-enunciado card__text">
              {nivel.enunciado}
            </p>

            {nivel.id !== "nivel10" && (
              <div className="page-practicar-conceptualizacion__actividad placeholder">
                <img
                  src={nivel.img}
                  alt={`Actividad ${nivel.id.replace("nivel", "")}`}
                  className="page-practicar-conceptualizacion__actividad-img"
                />
              </div>
            )}

            <button
              onClick={() => toggleFeedback(nivel.id)}
              className="page-practicar-conceptualizacion__feedback-btn btn-standard"
              disabled={feedbackVisible[nivel.id]}
            >
              Ver resultados
            </button>

            <AnimatePresence mode="wait">
              {feedbackVisible[nivel.id] && (
                <motion.div
                  key={`feedback-${nivel.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeIn" }}
                  className="page-practicar-conceptualizacion__feedback feedback"
                >
                  <p className="page-practicar-conceptualizacion__feedback-text feedback__text">
                    {nivel.retroalimentacion}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <Link
        to="/ar-cam"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cam-fixed"
      >
        <img src={imgCamara} alt="Cámara" />
      </Link>

      <button
        onClick={openAdvanceModal}
        className="btn-advance-info-fixed"
        title="Cómo avanzar en cada nivel"
      >
        <img src={imgAyuda} alt="Ayuda" />
      </button>

      <AnimatePresence>
        {markerModal.nivel && (
          <motion.div
            className="marker-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMarkerModal}
          >
            <motion.div
              className="marker-popup__content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Marcador ${markerModal.nivel.id}`}
            >
              <h3 className="marker-popup__title">
                {markerModal.tipo === 2
                  ? "Abre la cámara de escaneo en la esquina inferior izquierda y apunta a esta imagen para ver la solución del ejercicio"
                  : "Abre la cámara de escaneo en la esquina inferior izquierda y apunta a esta imagen para ver el modelo 3D."}
              </h3>

              <div className="marker-popup__media">
                {markerModal.tipo === 1 ? (
                  markerModal.nivel.imgMarker ? (
                    <img
                      src={markerModal.nivel.imgMarker}
                      alt={`Imagen del marcador para ${markerModal.nivel.id}`}
                      className="marker-popup__img"
                    />
                  ) : (
                    <div className="marker-popup__placeholder">
                      Espacio reservado para el marcador de este nivel.
                    </div>
                  )
                ) : markerModal.tipo === 2 ? (
                  markerModal.nivel.imgMarkerSolution ? (
                    <img
                      src={markerModal.nivel.imgMarkerSolution}
                      alt={`Segundo marcador para ${markerModal.nivel.id}`}
                      className="marker-popup__img"
                    />
                  ) : (
                    <div className="marker-popup__placeholder">
                      Espacio reservado para el marcador secundario.
                    </div>
                  )
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdvanceModal && (
          <motion.div
            className="marker-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAdvanceModal}
          >
            <motion.div
              className="marker-popup__content advance-info-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Cómo avanzar en cada nivel"
            >
              <h3 className="marker-popup__title advance-info-modal__title">
                ¿Cómo avanzar en cada nivel?
              </h3>

              <div className="advance-info-modal__text">
                <p>
                  En cada nivel realizarás una actividad siguiendo la
                  descripción indicada, como se muestra en la imagen de ejemplo.
                  Para ayudarte, hay códigos QR que permiten ver el gato en 3D y
                  las soluciones de cada reto en programación desconectada, para
                  que compares y revises tu avance. En el nivel 10 tendrás mayor
                  libertad creativa, ya que deberás crear una escena con los
                  personajes y escenarios que elijas, aplicando lo aprendido en
                  los niveles anteriores.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
