// React
import { useState, useEffect } from "react";

// Libraries
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// Components
import Footer from "../../components/Footer.jsx";

// Styles
import "../../styles/common.css";
import "../../styles/settingsModal.css";

// Fondo
import fondo from "../../assets/img/fondo-bucleWhile.png";

export default function CompruebaBucleWhile() {
  const dragStatements = [
    {
      id: "s1",
      texto:
        "El bucle repetir mientras se ejecuta solo si la condición es verdadera.",
      correcta: true,
    },
    {
      id: "s2",
      texto: "Es útil para controlar acciones mientras se presiona una tecla.",
      correcta: true,
    },
    {
      id: "s3",
      texto:
        "Se detiene automáticamente cuando la condición deja de cumplirse.",
      correcta: true,
    },
    {
      id: "s4",
      texto:
        "El bucle repetir mientras se ejecuta siempre, incluso sin condición.",
      correcta: false,
    },
    {
      id: "s5",
      texto: "No se puede usar con teclas presionadas.",
      correcta: false,
    },
    {
      id: "s6",
      texto: "No sirve para juegos ni simulaciones.",
      correcta: false,
    },
  ];

  const initialDragState = {
    correcto: [],
    incorrecto: [],
    pool: dragStatements.map((item) => item.id),
  };

  const getInitialState = () => {
    const savedAnswers = localStorage.getItem("compruebaBucleWhileAnswers");
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
          dragState: initialDragState,
          showDragFeedback: false,
          isLocked: false,
        };
      }
    }
    return {
      dragState: initialDragState,
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
    'Haz que el personaje avance 15 pasos, gire 10 grados y toque un sonido mientras no toque el borde del escenario. Cuando finalmente lo toque, debe decir "¡Llegué al límite!" y cambiar de disfraz.',
    'Haz que el personaje se desplace 20 pasos hacia el puntero del ratón, cambiando de disfraz en cada repetición, mientras no lo alcance. Cuando logre tocarlo, debe decir "¡Te atrapé!" y reproducir un sonido de victoria.',
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

  const hangValidate = () => {
    if (isLocked) {
      setIsResultOpen(true);
      return;
    }

    const allStatementsPlaced = dragState.pool.length === 0;

    if (!allStatementsPlaced) {
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
        seccion: "BucleWhile",
        dragState: dragState,
        correctCount: dragCorrectCount,
        totalCount: dragStatements.length,
        porcentaje: parseFloat(porcentajeCorrect.toFixed(2)),
        nota: parseFloat(nota),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("compruebaBucleWhileResult", "true");
      localStorage.setItem(
        "compruebaBucleWhileAnswers",
        JSON.stringify(answersData),
      );
      window.dispatchEvent(new Event("progress-updated"));
    }
  };

  useEffect(() => {
    const savedAnswers = localStorage.getItem("compruebaBucleWhileAnswers");
    if (savedAnswers && showDragFeedback && isLocked) {
      setIsResultOpen(false);
    }
  }, []);

  return (
    <div
      className="page-comprueba-bucle-while page-container page-container--with-padding"
      style={{ "--page-bg": `url(${fondo})` }}
    >
      <h2 className="page-comprueba-bucle-while__title page-title">
        Comprueba tu aprendizaje y revisa tu progreso
      </h2>

      <p className="page-comprueba-bucle-while__description page-description">
        Completa la actividad de arrastrar y soltar, luego llena el formulario.
      </p>

      <blockquote className="page-comprueba-bucle-while__quote quote">
        "Lo que oigo, lo olvido; lo que veo, lo recuerdo; lo que hago, lo
        aprendo."
        <cite>— Confucio</cite>
      </blockquote>

      <div className="page-comprueba-bucle-while__actividad media-container">
        <div className="drag-game">
          <p className="drag-game__intro">
            Arrastra cada enunciado hacia la columna correcta y luego valida tus
            respuestas.
          </p>

          <div className="drag-game__columns">
            <div
              className="drag-game__column"
              onDrop={(event) => handleDrop(event, "correcto")}
              onDragOver={handleDragOver}
            >
              <h4 className="drag-game__column-title">Correcto</h4>
              <div className="drag-game__items">
                {dragState.correcto.length === 0 && (
                  <p className="drag-game__placeholder">
                    Suelta aquí los enunciados correctos.
                  </p>
                )}
                {dragState.correcto.map((itemId) => {
                  const statement = dragStatements.find(
                    (item) => item.id === itemId,
                  );
                  return (
                    <div
                      key={itemId}
                      className={`drag-item ${getDragItemClass(
                        itemId,
                        "correcto",
                      )}`}
                      draggable={!showDragFeedback}
                      onDragStart={(event) => handleDragStart(event, itemId)}
                    >
                      {statement?.texto}
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
              <div className="drag-game__items">
                {dragState.incorrecto.length === 0 && (
                  <p className="drag-game__placeholder">
                    Suelta aquí los enunciados incorrectos.
                  </p>
                )}
                {dragState.incorrecto.map((itemId) => {
                  const statement = dragStatements.find(
                    (item) => item.id === itemId,
                  );
                  return (
                    <div
                      key={itemId}
                      className={`drag-item ${getDragItemClass(
                        itemId,
                        "incorrecto",
                      )}`}
                      draggable={!showDragFeedback}
                      onDragStart={(event) => handleDragStart(event, itemId)}
                    >
                      {statement?.texto}
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
            <h4 className="drag-game__pool-title">Enunciados</h4>
            <div className="drag-game__items drag-game__items--pool">
              {dragState.pool.length === 0 && (
                <p className="drag-game__placeholder">
                  No quedan enunciados por ubicar.
                </p>
              )}
              {dragState.pool.map((itemId) => {
                const statement = dragStatements.find(
                  (item) => item.id === itemId,
                );
                return (
                  <div
                    key={itemId}
                    className="drag-item"
                    draggable={!showDragFeedback}
                    onDragStart={(event) => handleDragStart(event, itemId)}
                  >
                    {statement?.texto}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={hangValidate}
        className="page-comprueba-bucle-while__submit-btn btn-standard"
      >
        {showDragFeedback || isLocked ? "Validado" : "Validar respuestas"}
      </button>

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
            <p>Debes ubicar todos los enunciados antes de validar.</p>
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
                ¡Has desbloqueado la sección de Actividad Recreativa!
              </p>
            </>
          )}
        </div>
      </Popup>

      <div className="page-comprueba-bucle-while__iframe-container">
        <iframe
          title="Formulario Bucle While"
          src="https://forms.office.com/r/tF395pkTnq?embed=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Cargando…
        </iframe>
      </div>

      <h3 className="page-comprueba-bucle-while__subtitle page-subtitle">
        Practica con el personaje
      </h3>

      <div className="page-comprueba-bucle-while__enunciados card-list">
        {enunciados.map((enunciado, index) => (
          <div
            key={index}
            className="page-comprueba-bucle-while__enunciado card"
          >
            <h3 className="page-comprueba-bucle-while__enunciado-titulo">
              Enunciado {index + 1}:
            </h3>
            <p className="page-comprueba-bucle-while__enunciado-texto">
              {enunciado}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
