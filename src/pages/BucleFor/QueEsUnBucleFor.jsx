// React
import { useState } from "react";

// Components
import Footer from "../../components/Footer.jsx";

// Libraries
import { motion, AnimatePresence } from "framer-motion";

// Styles
import "../../styles/common.css";

// Img
import img1 from "../../assets/img/bucleFor-img1.jpeg";

// Fondo
import fondo from "../../assets/img/fondo-bucleFor.png";

export default function QueEsUnBucleFor() {
  const [selectedCuadro, setSelectedCuadro] = useState(null);

  const CUADROS = {
    SABIAS_QUE: "sabiasQue",
    TE_HAS_PREGUNTADO: "teHasPreguntado",
    COMPRENSION: "comprension",
  };

  const cuadrosContent = {
    sabiasQue: [
      "Al comprender el bucle for puedes hacer que tus personajes repitan una acción exactamente las veces que quieras, ya sea por medio de contar saltos, pasos o giros.",
    ],
    teHasPreguntado: [
      "I. ¿Por qué el bucle for se compara con un contador que va paso a paso?",
      "II. ¿Es necesario darle instrucciones al inicio y al final, al bucle for?",
    ],
    comprension: [
      "Se utiliza cuando sabemos de antemano cuántas veces queremos repetir un bloque de código. Generalmente incluye tres partes: inicio, condición y actualización (por ejemplo, contar de 1 a 10)",
    ],
  };

  return (
    <div
      className="page-que-es-un-bucle-for page-container page-container--with-padding"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-que-es-un-bucle-for__title page-title">
        ¿Qué es el bucle for?
      </h2>

      <div className="page-que-es-un-bucle-for__cuadros btn-grid">
        <button
          onClick={() => setSelectedCuadro(CUADROS.SABIAS_QUE)}
          className={`page-que-es-un-bucle-for__cuadro-btn btn-standard ${selectedCuadro === CUADROS.SABIAS_QUE ? "selected" : ""}`}
        >
          <span>Sabías que…</span>
        </button>

        <button
          onClick={() => setSelectedCuadro(CUADROS.TE_HAS_PREGUNTADO)}
          className={`page-que-es-un-bucle-for__cuadro-btn btn-standard ${selectedCuadro === CUADROS.TE_HAS_PREGUNTADO ? "selected" : ""}`}
        >
          <span>Te has preguntado</span>
        </button>

        <button
          onClick={() => setSelectedCuadro(CUADROS.COMPRENSION)}
          className={`page-que-es-un-bucle-for__cuadro-btn btn-standard ${selectedCuadro === CUADROS.COMPRENSION ? "selected" : ""}`}
        >
          <span>Comprensión</span>
        </button>
      </div>

      <div className="page-que-es-un-bucle-for__content content-box">
        <AnimatePresence mode="wait">
          {selectedCuadro && (
            <motion.div
              key={selectedCuadro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeIn" }}
              className="page-que-es-un-bucle-for__selected-content"
            >
              <p className="content-box__text">
                {cuadrosContent[selectedCuadro].map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="page-que-es-un-bucle-for__description page-subtitle">
        Ahora, observemos el siguiente video sobre el bucle for.
      </p>

      <div className="page-que-es-un-bucle-for__video media-video">
        <iframe
          className="media-video__embed"
          src="https://www.youtube.com/embed/8bLtTjs3F3I"
          title="Concepto de bucle o ciclo en programación | Scratch 3.0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <p className="page-que-es-un-bucle-for__citation quote quote--small">
        Tomado de: Docente Pro. (2019). Concepto de bucle o ciclo en
        programación | Scratch 3.0 [Video]. Youtube.{" "}
        <a
          href="https://www.youtube.com/watch?v=8bLtTjs3F3I"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.youtube.com/watch?v=8bLtTjs3F3I
        </a>
      </p>

      <p className="page-que-es-un-bucle-for__description page-subtitle">
        A continuación, completa el siguiente crucigrama y al final observarás
        un enunciado que menciona qué es el bucle for y para qué funciona.
      </p>

      <div className="page-que-es-un-bucle-for__actividad media-container">
        <div className="page-que-es-un-bucle-for__actividad-placeholder placeholder placeholder--large">
          <iframe
            className="media-embed"
            src="https://es.educaplay.com/juego/27763363-atrevete_a_resolver_el_crucigrama.html"
            title="Crucigrama: Atrevete a resolver el crucigrama"
            frameBorder="0"
            allow="fullscreen; autoplay; allow-top-navigation-by-user-activation"
            allowFullScreen
          />
        </div>
      </div>

      <p className="page-que-es-un-bucle-for__info-box info-box">
        Un bucle es una estructura que permite <strong>repetir</strong> un{" "}
        <strong>bloque</strong> de <strong>código</strong> varias veces,
        siguiendo una <strong>condición</strong> que determina cuándo llega su{" "}
        <strong>fin</strong>. En cada <strong>ejecución</strong>, se actualiza
        una <strong>variable</strong> mediante un <strong>incremento</strong>, y
        un <strong>contador</strong> lleva el registro de las repeticiones. La{" "}
        <strong>secuencia</strong> de pasos dentro del ciclo debe estar bien
        definida para asegurar que el proceso sea lógico y eficiente.
      </p>

      <h3 className="page-que-es-un-bucle-for__subtitle page-subtitle">
        ¿Qué aprendimos hoy?
      </h3>

      <div className="page-que-es-un-bucle-for__mapa media-container">
        <div className="page-que-es-un-bucle-for__mapa-placeholder placeholder placeholder--large">
          <img src={img1} alt="Mapa conceptual del bucle for" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
