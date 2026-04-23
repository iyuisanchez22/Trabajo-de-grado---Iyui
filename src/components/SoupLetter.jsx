import "../styles/soupLetter.css";
import { useState, useMemo } from "react";

const WORDS = [
  "VIDEOJUEGOS",
  "BUCLEFOR",
  "BUCLEWHILE",
  "REPETICION",
  "INSTRUCCIONES",
  "CONDICION",
  "BLOQUE",
  "LOGICA",
  "PROCESO",
  "CODIGO",
];

const GRID_SIZE = 15;

// Direcciones: horizontal, vertical, diagonal
const DIRECTIONS = [
  [0, 1], // derecha
  [1, 0], // abajo
  [1, 1], // diagonal abajo-derecha
  [1, -1], // diagonal abajo-izquierda
  [0, -1], // izquierda
  [-1, 0], // arriba
  [-1, -1], // diagonal arriba-izquierda
  [-1, 1], // diagonal arriba-derecha
];

const generateGrid = () => {
  const grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));

  const placedWords = [];

  // Colocar cada palabra de forma aleatoria
  for (const word of WORDS) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      const startRow = Math.floor(Math.random() * GRID_SIZE);
      const startCol = Math.floor(Math.random() * GRID_SIZE);
      const direction =
        DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const [dRow, dCol] = direction;

      // Verificar si la palabra cabe en esta dirección
      const endRow = startRow + dRow * (word.length - 1);
      const endCol = startCol + dCol * (word.length - 1);

      if (
        endRow >= 0 &&
        endRow < GRID_SIZE &&
        endCol >= 0 &&
        endCol < GRID_SIZE
      ) {
        // Verificar si hay espacio disponible
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = startRow + dRow * i;
          const c = startCol + dCol * i;
          if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          // Colocar la palabra
          for (let i = 0; i < word.length; i++) {
            const r = startRow + dRow * i;
            const c = startCol + dCol * i;
            grid[r][c] = word[i];
          }
          placedWords.push(word);
          placed = true;
        }
      }

      attempts++;
    }
  }

  // Llenar celdas vacías con letras aleatorias
  const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return grid;
};

export default function SoupLetter() {
  const grid = useMemo(() => generateGrid(), []);
  const [startCell, setStartCell] = useState(null);
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);

  const getCellFromEvent = (e) => {
    const cell = e.currentTarget;
    const rowCol = cell.key.split("-").map(Number);
    return rowCol;
  };

  const handleCellStart = (row, col) => {
    // Si no hay celda inicial, establecerla
    if (!startCell) {
      setStartCell([row, col]);
      setCurrentPath([[row, col]]);
      return;
    }

    // Si hay celda inicial, usar este click como celda final
    const path = buildSelection(startCell, [row, col]);

    if (path.length === 0) {
      // Si la dirección no es válida, reiniciar
      setStartCell([row, col]);
      setCurrentPath([[row, col]]);
      return;
    }

    // Verificar si la palabra es válida
    const word = path.map(([r, c]) => grid[r][c]).join("");

    if (WORDS.includes(word) && !foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);
      setSelected((prev) => [...prev, ...path]);
    }

    // Reiniciar para nueva selección
    reset();
  };

  const handleMove = (row, col) => {
    // Si hay una celda inicial pero no hemos completado la palabra, mostrar preview
    if (startCell && !selected.includes([row, col])) {
      const path = buildSelection(startCell, [row, col]);
      if (path.length > 0) {
        setCurrentPath(path);
      }
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains("cell")) {
      const key = element.key;
      if (key) {
        const [row, col] = key.split("-").map(Number);
        handleMove(row, col);
      }
    }
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains("cell")) {
      const key = element.key;
      if (key) {
        const [row, col] = key.split("-").map(Number);
        handleCellStart(row, col);
      }
    }
  };

  const buildSelection = (start, end) => {
    const [sr, sc] = start;
    const [er, ec] = end;

    const dr = er - sr;
    const dc = ec - sc;

    // Validar dirección
    if (!(dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc))) {
      return [];
    }

    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

    const path = [];
    for (let i = 0; i <= steps; i++) {
      path.push([sr + stepR * i, sc + stepC * i]);
    }

    return path;
  };

  const reset = () => {
    setStartCell(null);
    setCurrentPath([]);
  };

  const isSelected = (row, col) =>
    selected.some(([r, c]) => r === row && c === col);

  const isPreview = (row, col) =>
    startCell &&
    currentPath.some(([r, c]) => r === row && c === col) &&
    !isSelected(row, col);

  const isStart = (row, col) =>
    startCell && startCell[0] === row && startCell[1] === col;

  return (
    <div className="word-search">
      <div
        className="grid"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <div
              key={`${r}-${c}`}
              className={`cell ${isSelected(r, c) ? "selected" : ""} ${
                isPreview(r, c) ? "preview" : ""
              } ${isStart(r, c) ? "start" : ""}`}
              onClick={() => handleCellStart(r, c)}
              onMouseMove={() => handleMove(r, c)}
              onTouchStart={() => handleCellStart(r, c)}
            >
              {letter}
            </div>
          )),
        )}
      </div>

      <ul className="word-list">
        {WORDS.map((word) => (
          <li key={word} className={foundWords.includes(word) ? "found" : ""}>
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}
