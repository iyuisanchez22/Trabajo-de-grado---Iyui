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
import fondo from "../../assets/img/fondo-bucleWhile.png";

// Img
import imgWhile1 from "../../assets/img/while-1.jpeg";
import imgWhile2 from "../../assets/img/while-2.jpeg";
import imgWhile3 from "../../assets/img/while-3.jpeg";
import imgWhile4 from "../../assets/img/while-4.jpeg";
import imgWhile5 from "../../assets/img/while-5.jpeg";
import imgWhile6 from "../../assets/img/while-6.jpeg";
import imgWhile7 from "../../assets/img/while-7.jpeg";
import imgWhile8 from "../../assets/img/while-8.jpeg";
import imgWhile9 from "../../assets/img/while-9.jpeg";
import imgCamara from "../../assets/img/camara.png";
import imgScanner from "../../assets/img/escanear.png";
import imgAyuda from "../../assets/img/ayuda.png";
import imgSolucion from "../../assets/img/solucion.png";

export default function PracticarBucleWhile() {
  const [feedbackVisible, setFeedbackVisible] = useState({});
  // markerModal keeps track of which level open and type
  const [markerModal, setMarkerModal] = useState({ nivel: null, tipo: 1 });
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  const openMarkerModal = (nivel, tipo = 1) => setMarkerModal({ nivel, tipo });
  const closeMarkerModal = () => setMarkerModal({ nivel: null, tipo: 1 });

  const openAdvanceModal = () => setShowAdvanceModal(true);
  const closeAdvanceModal = () => setShowAdvanceModal(false);

  const niveles = [
    {
      id: 1,
      titulo: "Nivel 1: Hasta el límite del escenario",
      enunciado:
        "Haz que tu personaje avance hasta tocar el borde del escenario.",
      retroalimentacion:
        "Aquí exploraste el uso de condiciones para controlar el movimiento. Comprendiste que el personaje puede avanzar y detenerse según lo que ocurre en el escenario. ¡Excelente trabajo! Estás aprendiendo a usar límites en tus programas.",
      img: imgWhile1,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-19.png",
    },
    {
      id: 2,
      titulo: "Nivel 2: Siguiendo al puntero",
      enunciado:
        "Haz que tu personaje gire 20 grados siguiendo el puntero del ratón.",
      retroalimentacion:
        "En esta actividad aprendiste a interactuar con el ratón. Comprendiste que los movimientos del puntero pueden influir directamente en el comportamiento del personaje. ¡Muy bien! Estás integrando interacción en tiempo real.",
      img: imgWhile2,
      imgMarker: "/markers-img/marker-c.png",
      imgMarkerSolution: "/markers-img/marker-20.png",
    },
    {
      id: 3,
      titulo: "Nivel 3: Un saludo condicionado",
      enunciado:
        "Haz que tu personaje salude mientras no se presione la tecla espacio.",
      retroalimentacion:
        "Aquí trabajaste con condiciones lógicas. Comprendiste que una acción puede ejecutarse solo cuando se cumple una condición específica. ¡Excelente! Estás dando un gran paso en el control del flujo del programa.",
      img: imgWhile3,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-21.png",
    },
    {
      id: 4,
      titulo: "Nivel 4: Transformación con límite",
      enunciado:
        "Haz que tu personaje cambie de disfraz hasta que toque el borde del escenario.",
      retroalimentacion:
        "En esta actividad combinaste cambios visuales con condiciones. Comprendiste que una acción puede repetirse hasta que ocurra un evento. ¡Muy bien! Tus animaciones ahora responden al entorno.",
      img: imgWhile4,
      imgMarker: "/markers-img/marker-b.png",
      imgMarkerSolution: "/markers-img/marker-22.png",
    },
    {
      id: 5,
      titulo: "Nivel 5: Acercándose al objetivo",
      enunciado:
        "Haz que tu personaje avance 5 pasos hasta tocar el puntero del ratón.",
      retroalimentacion:
        "Aquí exploraste la interacción entre el personaje y el puntero. Comprendiste que el movimiento puede detenerse cuando se alcanza un objetivo. ¡Excelente trabajo! Estás creando comportamientos más precisos.",
      img: imgWhile5,
      imgMarker: "/markers-img/marker-a.png",
      imgMarkerSolution: "/markers-img/marker-23.png",
    },
    {
      id: 6,
      titulo: "Nivel 6: Decisiones con números",
      enunciado:
        "Haz que tu personaje gire según si un número es mayor o menor.",
      retroalimentacion:
        "En esta actividad aprendiste a tomar decisiones usando comparaciones. Comprendiste que las condiciones permiten que el programa elija diferentes acciones. ¡Muy bien! Estás desarrollando el pensamiento lógico.",
      img: imgWhile6,
      imgMarker: "/markers-img/marker-c.png",
      imgMarkerSolution: "/markers-img/marker-24.png",
    },
    {
      id: 7,
      titulo: "Nivel 7: Contando paso a paso",
      enunciado: "Haz que el programa sume valores a un contador.",
      retroalimentacion:
        "Aquí descubriste cómo usar variables para llevar un registro. Comprendiste que los contadores permiten almacenar y actualizar información. ¡Excelente trabajo! Estás introduciéndote al uso de datos en programación.",
      img: imgWhile7,
      imgMarker: "/markers-img/marker-e.png",
      imgMarkerSolution: "/markers-img/marker-25.png",
    },
    {
      id: 8,
      titulo: "Nivel 8: Movimiento y cambio con control",
      enunciado:
        "Haz que tu personaje gire 10 grados y cambie de disfraz hasta que se presione una tecla.",
      retroalimentacion:
        "En esta actividad combinaste movimiento, apariencia y eventos. Comprendiste que una acción puede repetirse hasta que el usuario interactúe. ¡Muy bien! Tus programas ahora son más interactivos.",
      img: imgWhile8,
      imgMarker: "/markers-img/marker-b.png",
      imgMarkerSolution: "/markers-img/marker-26.png",
    },
    {
      id: 9,
      titulo: "Nivel 9: Entre el orden y el azar",
      enunciado:
        "Haz que tu personaje vaya al centro del escenario y luego se mueva a una posición aleatoria.",
      retroalimentacion:
        "Aquí exploraste posiciones fijas y aleatorias. Comprendiste que el personaje puede moverse de forma controlada o impredecible. ¡Excelente trabajo! Estás enriqueciendo la dinámica de tus programas.",
      img: imgWhile9,
      imgMarker: "/markers-img/marker-g.png",
      imgMarkerSolution: "/markers-img/marker-27.png",
    },
    {
      id: 10,
      titulo: "Nivel 10: Animación con persecución",
      enunciado:
        'Haz que el personaje cambie de disfraz, avance 10 pasos y toque un sonido mientras no alcance al puntero del ratón. Cuando finalmente lo toque, debe decir "¡Te encontré!"',
      retroalimentacion:
        "Aquí diseñaste una animación interactiva que combina movimiento, apariencia y sonido dentro de un bucle while. Comprendiste que la condición controla cuándo detener la secuencia y ejecutar una acción final. ¡Excelente! Estás aplicando lógica avanzada y creatividad para construir programas dinámicos e inteligentes.",
      imgMarker: "/markers-img/marker-f.png",
      imgMarkerSolution: null,
    },
  ];

  const toggleFeedback = (nivelId) => {
    setFeedbackVisible((prev) => ({
      ...prev,
      [nivelId]: prev[nivelId] ? prev[nivelId] : true,
    }));
  };

  return (
    <div
      className="page-practicar-bucle-while page-container"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-practicar-bucle-while__title page-title">
        Llegó la hora de practicar
      </h2>

      <p className="page-practicar-bucle-while__enunciado page-description">
        Encontrarás 10 niveles de actividades diseñadas para ayudarte a aprender
        y comprender qué es y cómo funciona el bucle while en programación;
        atrévete a resolverlos y confirma lo que sabes.
      </p>

      <div className="page-practicar-bucle-while__niveles card-list">
        {niveles.map((nivel) => (
          <div
            key={nivel.id}
            className="page-practicar-bucle-while__nivel card"
          >
            <div className="page-practicar-conceptualizacion__nivel-header">
              {/* secondary scanner button only if solution is provided and not level 10 */}
              {nivel.id !== 10 && (
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

              <h3 className="page-practicar-bucle-while__nivel-titulo card__title">
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

            <p className="page-practicar-bucle-while__nivel-enunciado card__text">
              {nivel.enunciado}
            </p>

            {nivel.id !== 10 && (
              <div className="page-practicar-bucle-while__imagen-placeholder placeholder">
                <img
                  src={nivel.img}
                  alt={`Actividad ${nivel.id}`}
                  className="page-practicar-bucle-while__actividad-img"
                />
              </div>
            )}

            <button
              onClick={() => toggleFeedback(nivel.id)}
              className="page-practicar-bucle-while__feedback-btn btn-standard"
              disabled={feedbackVisible[nivel.id]}
            >
              Ver resultados
            </button>

            <AnimatePresence>
              {feedbackVisible[nivel.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="page-practicar-bucle-while__feedback feedback"
                >
                  <p className="page-practicar-bucle-while__feedback-text feedback__text">
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
              aria-label={`Marcador nivel ${markerModal.nivel.id}`}
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
                      alt={`Imagen del marcador para el nivel ${markerModal.nivel.id}`}
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
                      alt={`Segundo marcador para el nivel ${markerModal.nivel.id}`}
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
