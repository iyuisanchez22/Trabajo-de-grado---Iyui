// React
import { useState, useEffect } from "react";

// Libraries
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// Components
import Footer from "../components/Footer.jsx";

// Styles
import "../styles/common.css";
import "../styles/settingsModal.css";

// Fondo
import fondo from "../assets/img/fondo-inicio-actiFinal.png";

// Img
import img1 from "../assets/img/actividadFinal-img1.png"; // Correcta
import img2 from "../assets/img/actividadFinal-img2.png"; // Incorrecta
import img3 from "../assets/img/actividadFinal-img3.png"; // Correcta
import img4 from "../assets/img/actividadFinal-img4.png"; // Incorrecta
import img5 from "../assets/img/actividadFinal-img5.png"; // Correcta
import img6 from "../assets/img/actividadFinal-img6.png"; // Incorrecta

export default function ActividadRecreativa() {
  const dragStatements = [
    {
      id: "i1",
      imagen: img1,
      alt: "Lámina correcta 1",
      correcta: true,
    },
    {
      id: "i2",
      imagen: img2,
      alt: "Lámina incorrecta 1",
      correcta: false,
    },
    {
      id: "i3",
      imagen: img3,
      alt: "Lámina correcta 2",
      correcta: true,
    },
    {
      id: "i4",
      imagen: img4,
      alt: "Lámina incorrecta 2",
      correcta: false,
    },
    {
      id: "i5",
      imagen: img5,
      alt: "Lámina correcta 3",
      correcta: true,
    },
    {
      id: "i6",
      imagen: img6,
      alt: "Lámina incorrecta 3",
      correcta: false,
    },
  ];

  const createInitialDragState = () => {
    const shuffledPool = [...dragStatements]
      .sort(() => Math.random() - 0.5)
      .map((item) => item.id);

    return {
      correcto: [],
      incorrecto: [],
      pool: shuffledPool,
    };
  };

  const getInitialState = () => {
    const savedAnswers = localStorage.getItem("actividadRecreativaAnswers");
    if (savedAnswers) {
      try {
        const data = JSON.parse(savedAnswers);
        return {
          dragState: data.dragState,
          showDragFeedback: true,
          isLocked: true,
        };
      } catch (e) {
        return {
          dragState: createInitialDragState(),
          showDragFeedback: false,
          isLocked: false,
        };
      }
    }
    return {
      dragState: createInitialDragState(),
      showDragFeedback: false,
      isLocked: false,
    };
  };

  const initialState = getInitialState();

  const [dragState, setDragState] = useState(initialState.dragState);
  const [showDragFeedback, setShowDragFeedback] = useState(
    initialState.showDragFeedback,
  );
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(initialState.isLocked);

  const enunciados = [
    'Representa en láminas la secuencia de acciones de un grupo de animales en el zoológico: el primer animal cambia de color, el segundo salta cada vez que su amigo cambia de color, y el último come 10 manzanas, contando en voz alta cada una con la frase "Me comí # manzana". Organiza las láminas en orden para mostrar cómo se repiten las acciones y cómo interactúan los animales.',
    'Programa en Scratch la interacción de tres animales en el zoológico: el primero cambia de color, el segundo salta cada vez que detecta el cambio de color de su amigo, y el último come 10 manzanas, mostrando un mensaje que diga "Me comí # manzana" en cada repetición. Utiliza bucles y condiciones para que las acciones se ejecuten de manera automática y coordinada.',
  ];

  const handleDragStart = (event, itemId) => {
    if (showDragFeedback || isLocked) return;
    event.dataTransfer.setData("text/plain", itemId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event, target) => {
    event.preventDefault();
    if (showDragFeedback || isLocked) return;

    const itemId = event.dataTransfer.getData("text/plain");
    if (!itemId) return;

    setDragState((prev) => {
      if (prev[target].includes(itemId)) return prev;

      const nextState = {
        correcto: prev.correcto.filter((id) => id !== itemId),
        incorrecto: prev.incorrecto.filter((id) => id !== itemId),
        pool: prev.pool.filter((id) => id !== itemId),
      };

      nextState[target] = [...nextState[target], itemId];
      return nextState;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getDragItemClass = (itemId, container) => {
    if (!showDragFeedback) return "";
    const statement = dragStatements.find((item) => item.id === itemId);
    if (!statement) return "";
    const shouldBeCorrect = statement.correcta;
    const isCorrectContainer =
      (shouldBeCorrect && container === "correcto") ||
      (!shouldBeCorrect && container === "incorrecto");
    return isCorrectContainer ? "drag-item--correct" : "drag-item--incorrect";
  };

  const handleShowFeedback = () => {
    if (isLocked) {
      setIsResultOpen(true);
      return;
    }

    const allImagesPlaced = dragState.pool.length === 0;

    if (!allImagesPlaced) {
      setIsResultOpen(true);
      return;
    }

    setShowDragFeedback(true);
    setIsResultOpen(true);
    setIsLocked(true);
  };

  const handleCloseResult = () => {
    saveProgress();
    setIsResultOpen(false);
  };

  const dragCorrectCount = dragStatements.filter((statement) => {
    const target = statement.correcta ? "correcto" : "incorrecto";
    return dragState[target].includes(statement.id);
  }).length;

  const isActivityComplete = showDragFeedback && dragState.pool.length === 0;
  const porcentajeCorrect = (dragCorrectCount / dragStatements.length) * 100;
  const nota = Math.max(
    1.0,
    (dragCorrectCount / dragStatements.length) * 5.0,
  ).toFixed(1);

  const saveProgress = () => {
    if (showDragFeedback && dragState.pool.length === 0) {
      const answersData = {
        seccion: "ActividadRecreativa",
        dragState: dragState,
        correctCount: dragCorrectCount,
        totalCount: dragStatements.length,
        porcentaje: parseFloat(porcentajeCorrect.toFixed(2)),
        nota: parseFloat(nota),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(
        "actividadRecreativaAnswers",
        JSON.stringify(answersData),
      );
      window.dispatchEvent(new Event("progress-updated"));
    }
  };

  useEffect(() => {
    const savedAnswers = localStorage.getItem("actividadRecreativaAnswers");
    if (savedAnswers && showDragFeedback && isLocked) {
      setIsResultOpen(false);
    }
  }, []);

  return (
    <div
      className="page-actividad-recreativa page-container"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-actividad-recreativa__title page-title">
        Evaluación final: Descubramos lo aprendido
      </h2>

      <p className="page-actividad-recreativa__enunciado page-description">
        A continuación, realiza la actividad de arrastrar la imagen al recuadro
        correspondiente. Luego, completa el formulario y concluye creando tu
        zoológico con láminas y en Scratch.
      </p>

      <blockquote className="page-actividad-recreativa__quote quote">
        "La educación es encender una llama, no llenar un recipiente."
        <cite>— Sócrates</cite>
      </blockquote>

      <div className="page-actividad-recreativa__actividad media-container">
        <div className="drag-game">
          <p className="drag-game__intro">
            Arrastra cada imagen hacia la columna correcta y luego valida tus
            respuestas.
          </p>

          <div className="drag-game__columns">
            <div
              className="drag-game__column"
              onDrop={(event) => handleDrop(event, "correcto")}
              onDragOver={handleDragOver}
            >
              <h4 className="drag-game__column-title">Correcto</h4>
              <div className="drag-game__items drag-game__items--images">
                {dragState.correcto.length === 0 && (
                  <p className="drag-game__placeholder">
                    Suelta aquí las imágenes correctas.
                  </p>
                )}
                {dragState.correcto.map((itemId) => {
                  const statement = dragStatements.find(
                    (item) => item.id === itemId,
                  );
                  return (
                    <div
                      key={itemId}
                      className={`drag-item drag-item--image ${getDragItemClass(
                        itemId,
                        "correcto",
                      )}`}
                      draggable={!showDragFeedback}
                      onDragStart={(event) => handleDragStart(event, itemId)}
                    >
                      <img
                        src={statement?.imagen}
                        alt={statement?.alt}
                        className="drag-item__image"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="drag-game__column"
              onDrop={(event) => handleDrop(event, "incorrecto")}
              onDragOver={handleDragOver}
            >
              <h4 className="drag-game__column-title">Incorrecto</h4>
              <div className="drag-game__items drag-game__items--images">
                {dragState.incorrecto.length === 0 && (
                  <p className="drag-game__placeholder">
                    Suelta aquí las imágenes incorrectas.
                  </p>
                )}
                {dragState.incorrecto.map((itemId) => {
                  const statement = dragStatements.find(
                    (item) => item.id === itemId,
                  );
                  return (
                    <div
                      key={itemId}
                      className={`drag-item drag-item--image ${getDragItemClass(
                        itemId,
                        "incorrecto",
                      )}`}
                      draggable={!showDragFeedback}
                      onDragStart={(event) => handleDragStart(event, itemId)}
                    >
                      <img
                        src={statement?.imagen}
                        alt={statement?.alt}
                        className="drag-item__image"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="drag-game__pool"
            onDrop={(event) => handleDrop(event, "pool")}
            onDragOver={handleDragOver}
          >
            <h4 className="drag-game__pool-title">Imágenes</h4>
            <div className="drag-game__items drag-game__items--pool drag-game__items--images">
              {dragState.pool.length === 0 && (
                <p className="drag-game__placeholder">
                  No quedan imágenes por ubicar.
                </p>
              )}
              {dragState.pool.map((itemId) => {
                const statement = dragStatements.find(
                  (item) => item.id === itemId,
                );
                return (
                  <div
                    key={itemId}
                    className="drag-item drag-item--image"
                    draggable={!showDragFeedback}
                    onDragStart={(event) => handleDragStart(event, itemId)}
                  >
                    <img
                      src={statement?.imagen}
                      alt={statement?.alt}
                      className="drag-item__image"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="page-actividad-recreativa__submit">
        <button
          onClick={handleShowFeedback}
          className="page-actividad-recreativa__submit-btn btn-standard"
        >
          {showDragFeedback || isLocked ? "Validado" : "Validar respuestas"}
        </button>
      </div>

      <Popup
        open={isResultOpen}
        onClose={handleCloseResult}
        modal
        closeOnDocumentClick
        overlayClassName="modal-overlay"
        className="modal-container"
      >
        <div className="modal-header">
          <h2>Resultado</h2>
          <button
            className="modal-close-btn"
            onClick={handleCloseResult}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {dragState.pool.length > 0 && !showDragFeedback ? (
            <p>Debes ubicar todas las imágenes antes de validar.</p>
          ) : (
            <>
              <p
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  color: "green",
                  marginBottom: "1em",
                }}
              >
                ¡Actividad completada! 🎉
              </p>
              <p
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  color: "#0066cc",
                  marginBottom: "1em",
                }}
              >
                Nota: {nota}/5.0
              </p>
              <p>
                Respuestas correctas: {dragCorrectCount} de{" "}
                {dragStatements.length} ({porcentajeCorrect.toFixed(0)}%)
              </p>
            </>
          )}
        </div>
      </Popup>

      <div className="page-actividad-recreativa__iframe-container">
        <iframe
          title="Formulario Actividad Recreativa"
          src="https://forms.office.com/r/9NuTxLLwyF?embed=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Cargando…
        </iframe>
      </div>

      <div className="page-actividad-recreativa__iframe-container">
        <iframe
          title="Formulario Extra 1"
          src="https://forms.cloud.microsoft/r/8e3f9HEHNF?embed=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Cargando…
        </iframe>
      </div>

      <div className="page-actividad-recreativa__iframe-container">
        <iframe
          title="Formulario Extra 2"
          src="https://forms.cloud.microsoft/r/3uu8w1cAKZ?embed=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Cargando…
        </iframe>
      </div>

      <h3 className="page-actividad-recreativa__subtitle page-subtitle">
        Practica creando tu zoológico
      </h3>

      <div className="page-actividad-recreativa__enunciados card-list">
        {enunciados.map((enunciado, index) => (
          <div
            key={index}
            className="page-actividad-recreativa__enunciado card"
          >
            <h3 className="page-actividad-recreativa__enunciado-titulo">
              Enunciado {index + 1}:
            </h3>
            <p className="page-actividad-recreativa__enunciado-texto">
              {enunciado}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
