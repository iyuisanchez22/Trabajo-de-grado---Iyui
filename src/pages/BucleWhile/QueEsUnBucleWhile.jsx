// React
import { useState } from "react";

// Components
import Footer from "../../components/Footer.jsx";

// Libraries
import { motion, AnimatePresence } from "framer-motion";

// Styles
import "../../styles/common.css";

// Img
import img1 from "../../assets/img/bucleWhile-img1.png";

// Fondo
import fondo from "../../assets/img/fondo-bucleWhile.png";

// Sounds
import sound1 from "../../assets/sounds/bucleWhile.mp3";

export default function QueEsUnBucleWhile() {
  const [selectedCuadro, setSelectedCuadro] = useState(null);

  const CUADROS = {
    SABIAS_QUE: "sabiasQue",
    TE_HAS_PREGUNTADO: "teHasPreguntado",
    COMPRENSION: "comprension",
  };

  const cuadrosContent = {
    sabiasQue:
      "El bucle while es ideal para ejecutar tareas hasta que una condición cambie",
    teHasPreguntado: [
      "I. ¿En qué casos resulta más útil usar el bucle while en lugar del bucle for?",
      "II. ¿Qué ejemplos de la vida cotidiana se pueden representar con un bucle while?",
    ],
    comprension:
      "Se emplea cuando no sabemos el número exacto de repeticiones, y la ejecución depende de que una condición siga siendo verdadera. El ciclo continúa hasta que la condición deja de cumplirse.",
  };

  return (
    <div
      className="page-que-es-un-bucle-while page-container"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-que-es-un-bucle-while__title page-title">
        ¿Qué es el bucle while?
      </h2>

      <div className="page-que-es-un-bucle-while__cuadros btn-grid">
        <button
          onClick={() => setSelectedCuadro(CUADROS.SABIAS_QUE)}
          className={`page-que-es-un-bucle-while__cuadro-btn btn-standard ${selectedCuadro === CUADROS.SABIAS_QUE ? "selected" : ""}`}
        >
          <span>Sabías que</span>
        </button>

        <button
          onClick={() => setSelectedCuadro(CUADROS.TE_HAS_PREGUNTADO)}
          className={`page-que-es-un-bucle-while__cuadro-btn btn-standard ${selectedCuadro === CUADROS.TE_HAS_PREGUNTADO ? "selected" : ""}`}
        >
          <span>Te has preguntado</span>
        </button>

        <button
          onClick={() => setSelectedCuadro(CUADROS.COMPRENSION)}
          className={`page-que-es-un-bucle-while__cuadro-btn btn-standard ${selectedCuadro === CUADROS.COMPRENSION ? "selected" : ""}`}
        >
          <span>Comprensión</span>
        </button>
      </div>

      <div className="page-que-es-un-bucle-while__content content-box">
        <AnimatePresence mode="wait">
          {selectedCuadro && (
            <motion.div
              key={selectedCuadro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeIn" }}
              className="page-que-es-un-bucle-while__selected-content"
            >
              <p className="content-box__text">
                {cuadrosContent[selectedCuadro]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="page-que-es-un-bucle-while__description page-subtitle">
        Observa la imagen que representa un ejemplo del bucle while, mientras
        escuchas la explicación que aparece en el siguiente audio.
      </p>

      <div className="page-que-es-un-bucle-while__imagen media-container">
        <div className="page-que-es-un-bucle-while__imagen-placeholder placeholder placeholder--large">
          <img
            src={img1}
            alt="Ejemplo de bucle while representado con un personaje que repite una acción hasta que se cumpla una condición"
            className="media-container__image"
          />
        </div>
      </div>

      <div className="page-que-es-un-bucle-while__audio media-container">
        <div className="page-que-es-un-bucle-while__audio-placeholder placeholder placeholder--large placeholder--small">
          <audio controls src={sound1}>
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      </div>

      <p className="page-que-es-un-bucle-while__description page-subtitle">
        ¡Pon a prueba tu memoria! Realiza la actividad de memoria que
        encontrarás a continuación y disfruta aprendiendo mientras recuerdas lo
        visto.
      </p>

      <div className="page-que-es-un-bucle-while__actividad media-container">
        <div className="page-que-es-un-bucle-while__actividad-placeholder placeholder placeholder--large">
          <iframe
            className="media-embed"
            src="https://es.educaplay.com/juego/27764205-relaciona_cada_bucle.html"
            title="Juego: Relaciona cada bucle"
            frameBorder="0"
            allow="fullscreen; autoplay; allow-top-navigation-by-user-activation"
            allowFullScreen
          />
        </div>
      </div>

      <h3 className="page-que-es-un-bucle-while__subtitle page-subtitle">
        ¿Qué aprendimos hoy?
      </h3>

      <div className="page-que-es-un-bucle-while__presentacion media-container">
        <div className="page-que-es-un-bucle-while__presentacion-placeholder placeholder placeholder--large">
          <iframe
            loading="lazy"
            src="https://www.canva.com/design/DAG945QpeMI/fy_ZSL0qtzMDogiC_W4S_w/view?embed"
            allowfullscreen="allowfullscreen"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}
