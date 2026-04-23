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
import fondo from "../../assets/img/fondo-bucleFor.png";

// Img
import imgFor1 from "../../assets/img/for-1.jpeg";
import imgFor2 from "../../assets/img/for-2.jpeg";
import imgFor3 from "../../assets/img/for-3.jpeg";
import imgFor4 from "../../assets/img/for-4.jpeg";
import imgFor5 from "../../assets/img/for-5.jpeg";
import imgFor6 from "../../assets/img/for-6.jpeg";
import imgFor7 from "../../assets/img/for-7.jpeg";
import imgFor8 from "../../assets/img/for-8.jpeg";
import imgFor9 from "../../assets/img/for-9.jpeg";
import imgCamara from "../../assets/img/camara.png";
import imgScanner from "../../assets/img/escanear.png";
import imgAyuda from "../../assets/img/ayuda.png";
import imgSolucion from "../../assets/img/solucion.png";

export default function PracticarBucleFor() {
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
      titulo: "Nivel 1: Avanzando con repetición",
      enunciado:
        "Haz que tu personaje avance 10 pasos y repita esta acción 5 veces.",
      retroalimentacion:
        "Aquí aprendiste a combinar movimiento con repetición. Comprendiste que usar ciclos permite que el personaje avance varias veces sin repetir bloques. ¡Excelente trabajo! Estás fortaleciendo tu comprensión de los bucles.",
      img: imgFor1,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-10.png",
    },
    {
      id: "nivel2",
      titulo: "Nivel 2: Girando con precisión",
      enunciado: "Haz que tu personaje realice 3 giros de 20 grados.",
      retroalimentacion:
        "En esta actividad exploraste cómo controlar giros específicos usando repetición. Comprendiste que ajustar los grados y la cantidad de repeticiones cambia el resultado del movimiento. ¡Muy bien! Estás afinando el control del movimiento.",
      img: imgFor2,
      imgMarker: "/markers-img/marker-c.png",
      imgMarkerSolution: "/markers-img/marker-11.png",
    },
    {
      id: "nivel3",
      titulo: "Nivel 3: Saludos que se repiten",
      enunciado: "Haz que tu personaje diga un saludo 4 veces.",
      retroalimentacion:
        "Aquí descubriste cómo repetir mensajes usando ciclos. Comprendiste que la repetición es útil para reforzar acciones sin duplicar código. ¡Buen trabajo! Tus programas ahora son más ordenados.",
      img: imgFor3,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-12.png",
    },
    {
      id: "nivel4",
      titulo: "Nivel 4: Transformaciones repetidas",
      enunciado: "Haz que tu personaje cambie de disfraz dos veces.",
      retroalimentacion:
        "En esta actividad reforzaste el uso de cambios visuales mediante repetición. Comprendiste que alternar disfraces ayuda a simular movimiento. ¡Excelente! Estás dando más dinamismo a tus animaciones.",
      img: imgFor4,
      imgMarker: "/markers-img/marker-b.png",
      imgMarkerSolution: "/markers-img/marker-13.png",
    },
    {
      id: "nivel5",
      titulo: "Nivel 5: Regresando al punto inicial",
      enunciado: "Haz que tu personaje vaya al centro del escenario 4 veces.",
      retroalimentacion:
        "Aquí aprendiste a usar posiciones específicas para controlar el movimiento. Comprendiste que volver al centro ayuda a reiniciar acciones o animaciones. ¡Muy bien! Estás organizando mejor el comportamiento del personaje.",
      img: imgFor5,
      imgMarker: "/markers-img/marker-c.png",
      imgMarkerSolution: "/markers-img/marker-14.png",
    },
    {
      id: "nivel6",
      titulo: "Nivel 6: Jugando con el azar",
      enunciado: "Haz que tu personaje diga un número aleatorio.",
      retroalimentacion:
        "En esta actividad exploraste el uso del azar en programación. Comprendiste que los números aleatorios hacen que cada ejecución sea diferente. ¡Excelente trabajo! Estás creando programas más interesantes y variados.",
      img: imgFor6,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-15.png",
    },
    {
      id: "nivel7",
      titulo: "Nivel 7: Contando con diversión",
      enunciado: "Haz que tu personaje cuente frutas.",
      retroalimentacion:
        "Aquí practicaste el conteo usando secuencias o repeticiones. Comprendiste que contar elementos ayuda a representar información de forma ordenada. ¡Muy bien! Estás aplicando la lógica de conteo en tus programas.Aquí practicaste el conteo usando secuencias o repeticiones. Comprendiste que contar elementos ayuda a representar información de forma ordenada. ¡Muy bien! Estás aplicando la lógica de conteo en tus programas.",
      img: imgFor7,
      imgMarker: "/markers-img/marker-d.png",
      imgMarkerSolution: "/markers-img/marker-16.png",
    },
    {
      id: "nivel8",
      titulo: "Nivel 8: Contando en el cielo",
      enunciado: "Haz que tu personaje cuente estrellas.",
      retroalimentacion:
        "En esta actividad reforzaste el conteo mediante programación. Comprendiste que repetir acciones permite contar de manera clara y estructurada. ¡Excelente! Sigues fortaleciendo tu pensamiento lógico.",
      img: imgFor8,
      imgMarker: "/markers-img/marker-e.png",
      imgMarkerSolution: "/markers-img/marker-17.png",
    },
    {
      id: "nivel9",
      titulo: "Nivel 9: Del uno al diez con código",
      enunciado: "Haz que tu personaje cuente del 1 al 10.",
      retroalimentacion:
        "Aquí integraste secuencia y conteo numérico. Comprendiste cómo organizar números en orden ascendente usando programación. ¡Gran trabajo! Estás consolidando habilidades fundamentales para retos más avanzados.",
      img: imgFor9,
      imgMarker: "/markers-img/marker-e.png",
      imgMarkerSolution: "/markers-img/marker-18.png",
    },
    {
      id: "nivel10",
      titulo: "Nivel 10: Animación continua",
      enunciado:
        "Crea una animación en Scratch donde un personaje se desplace, gire, cambie de disfraz y de colores, mientras lleva a cabo una recolección de objetos. Durante la animación, el personaje debe contar elementos (frutas, estrellas, números).",
      retroalimentacion:
        "Aquí creaste una animación fluida combinando movimiento y disfraces dentro de un bucle. Reconociste que la repetición da continuidad y ritmo visual. ¡Muy bien! Estás programando con creatividad y lógica avanzada.",
      imgMarker: "/markers-img/marker-f.png",
      imgMarkerSolution: null,
    },
  ];

  return (
    <div
      className="page-practicar-bucle-for page-container page-container--with-padding"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-practicar-bucle-for__title page-title">
        Llegó la hora de practicar
      </h2>

      <p className="page-practicar-bucle-for__description page-subtitle">
        Encontrarás 10 niveles de actividades diseñadas para ayudarte a aprender
        y comprender qué es y cómo funciona el bucle for en programación;
        atrévete a resolverlos y confirma lo que sabes.
      </p>

      <div className="page-practicar-bucle-for__niveles card-list">
        {niveles.map((nivel) => (
          <div
            key={nivel.id}
            className="page-practicar-bucle-for__nivel-card card"
          >
            <div className="page-practicar-conceptualizacion__nivel-header">
              {/* show secondary scanner when a solution marker exists and not level10 */}
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

              <h3 className="page-practicar-bucle-for__nivel-title card__title">
                {nivel.titulo}
              </h3>

              {/* primary scanner button */}
              <button
                type="button"
                className="btn-scanner-card"
                onClick={() => openMarkerModal(nivel, 1)}
              >
                <img src={imgScanner} alt="Escáner" />
              </button>
            </div>

            <p className="page-practicar-bucle-for__nivel-enunciado card__text">
              {nivel.enunciado}
            </p>

            {nivel.id !== "nivel10" && (
              <div className="page-practicar-bucle-for__actividad placeholder">
                <img
                  src={nivel.img}
                  alt={`Actividad ${nivel.id.replace("nivel", "")}`}
                  className="page-practicar-bucle-for__actividad-img"
                />
              </div>
            )}

            <button
              onClick={() => toggleFeedback(nivel.id)}
              className="page-practicar-bucle-for__feedback-btn btn-standard"
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
                  className="page-practicar-bucle-for__feedback feedback"
                >
                  <p className="page-practicar-bucle-for__feedback-text feedback__text">
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
                  : "Abre la cámara de escaneo que está en la parte inferior izquierda y apunta a esta imagen para ver el modelo 3D."}
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
