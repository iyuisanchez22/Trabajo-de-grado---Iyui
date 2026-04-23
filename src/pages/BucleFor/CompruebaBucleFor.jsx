// React
import { useState, useEffect } from "react";

// Libraries
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// Styles
import "../../styles/common.css";
import "../../styles/settingsModal.css";

// Components
import Footer from "../../components/Footer.jsx";

// Fondo
import fondo from "../../assets/img/fondo-bucleFor.png";

// Img
import img1 from "../../assets/img/bucleFor-img-actividad-1.jpeg"; // Correcta
import img2 from "../../assets/img/bucleFor-img-actividad-2.jpeg"; // Correcta
import img3 from "../../assets/img/bucleFor-img-actividad-3.jpeg"; // Incorrecta
import img4 from "../../assets/img/bucleFor-img-actividad-4.jpeg"; // Correcta
import img5 from "../../assets/img/bucleFor-img-actividad-5.jpeg"; // Incorrecta
import img6 from "../../assets/img/bucleFor-img-actividad-6.jpeg"; // Correcta
import img7 from "../../assets/img/bucleFor-img-actividad-7.jpeg"; // Incorrecta
import img8 from "../../assets/img/bucleFor-img-actividad-8.jpeg"; // Correcta
import img9 from "../../assets/img/bucleFor-img-actividad-9.jpeg"; // Incorrecta
import img10 from "../../assets/img/bucleFor-img-actividad-10.jpeg"; // Incorrecta
import img11 from "../../assets/img/bucleFor-img-actividad-11.jpeg"; // Incorrecta

export default function CompruebaBucleFor() {
  const dragStatements = [
    {
      id: "i1",
      imagen: img1,
      alt: "Actividad bucle for 1",
      correcta: true,
    },
    {
      id: "i2",
      imagen: img2,
      alt: "Actividad bucle for 2",
      correcta: true,
    },
    {
      id: "i3",
      imagen: img3,
      alt: "Actividad bucle for 3",
      correcta: false,
    },
    {
      id: "i4",
      imagen: img4,
      alt: "Actividad bucle for 4",
      correcta: true,
    },
    {
      id: "i5",
      imagen: img5,
      alt: "Actividad bucle for 5",
      correcta: false,
    },
    {
      id: "i6",
      imagen: img6,
      alt: "Actividad bucle for 6",
      correcta: true,
    },
    {
      id: "i7",
      imagen: img7,
      alt: "Actividad bucle for 7",
      correcta: false,
    },
    {
      id: "i8",
      imagen: img8,
      alt: "Actividad bucle for 8",
      correcta: true,
    },
    {
      id: "i9",
      imagen: img9,
      alt: "Actividad bucle for 9",
      correcta: false,
    },
    {
      id: "i10",
      imagen: img10,
      alt: "Actividad bucle for 10",
      correcta: false,
    },
    {
      id: "i11",
      imagen: img11,
      alt: "Actividad bucle for 11",
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
    const savedAnswers = localStorage.getItem("compruebaBucleForAnswers");
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
    "Haz que el personaje avance 10 pasos, gire 15 grados y diga, ¡Vamos! en cada repetición, repitiendo esta secuencia 6 veces con un bloque de repetición.",
    "Haz que el personaje toque un sonido, cambie de disfraz y avance 20 pasos, repitiendo toda la secuencia 5 veces con un bloque de repetición.",
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
        seccion: "BucleFor",
        dragState: dragState,
        correctCount: dragCorrectCount,
        totalCount: dragStatements.length,
        porcentaje: parseFloat(porcentajeCorrect.toFixed(2)),
        nota: parseFloat(nota),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("compruebaBucleForResult", "true");
      localStorage.setItem(
        "compruebaBucleForAnswers",
        JSON.stringify(answersData),
      );
      window.dispatchEvent(new Event("progress-updated"));
    }
  };

  useEffect(() => {
    const savedAnswers = localStorage.getItem("compruebaBucleForAnswers");
    if (savedAnswers && showDragFeedback && isLocked) {
      setIsResultOpen(false);
    }
  }, []);

  return (
    <div
      className="page-comprueba-bucle-for page-container page-container--with-padding"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-comprueba-bucle-for__title page-title">
        Comprueba tu aprendizaje y revisa tu progreso
      </h2>

      <p className="page-comprueba-bucle-for__description page-description page-description--large">
        Revisa los siguientes enunciados y completa el formulario
        correspondiente.
      </p>

      <blockquote className="page-comprueba-bucle-for__quote quote">
        “El aprendizaje es experiencia, todo lo demás es información.”– Albert
        Einstein
      </blockquote>
      <div className="page-comprueba-bucle-for__actividad media-container">
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

      <div className="page-comprueba-bucle-for__submit">
        <button
          onClick={handleShowFeedback}
          className="page-comprueba-bucle-for__submit-btn btn-standard"
        >
          {showDragFeedback || isLocked ? "Validado" : "Validar respuestas"}
        </button>
        <span className="btn-standard__bg" aria-hidden="true" />
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
              <p
                style={{
                  marginTop: "1em",
                  fontWeight: "bold",
                  color: "#0066cc",
                }}
              >
                ¡Has desbloqueado la sección de Bucle While!
              </p>
            </>
          )}
        </div>
      </Popup>
      <div className="page-comprueba-bucle-for__iframe-container">
        <iframe
          title="Formulario Bucle For"
          src="https://forms.office.com/r/j1YbWDbry1?embed=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Cargando…
        </iframe>
      </div>

      <h3 className="page-comprueba-bucle-for__subtitle page-subtitle">
        Practica las repeticiones
      </h3>

      <div className="page-comprueba-bucle-for__enunciados card-list">
        {enunciados.map((enunciado, index) => (
          <div key={index} className="page-comprueba-bucle-for__enunciado card">
            <h3 className="page-comprueba-bucle-for__enunciado-titulo">
              Enunciado {index + 1}:
            </h3>
            <p className="page-comprueba-bucle-for__enunciado-texto">
              {enunciado}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
