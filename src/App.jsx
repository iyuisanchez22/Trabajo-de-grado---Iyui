import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";

import Bienvenida from "./pages/Bienvenida";
import Inicio from "./pages/Inicio";

import QueEsUnBucle from "./pages/Conceptualizacion/QueEsUnBucle";
import PracticarConceptualizacion from "./pages/Conceptualizacion/PracticarConceptualizacion";
import CompruebaConceptualizacion from "./pages/Conceptualizacion/CompruebaConceptualizacion";

import QueEsUnBucleFor from "./pages/BucleFor/QueEsUnBucleFor";
import PracticarBucleFor from "./pages/BucleFor/PracticarBucleFor";
import CompruebaBucleFor from "./pages/BucleFor/CompruebaBucleFor";

import QueEsUnBucleWhile from "./pages/BucleWhile/QueEsUnBucleWhile";
import PracticarBucleWhile from "./pages/BucleWhile/PracticarBucleWhile";
import CompruebaBucleWhile from "./pages/BucleWhile/CompruebaBucleWhile";

import ActividadRecreativa from "./pages/ActividadRecreativa";
import ArCam from "./pages/ArCam";

function App() {
  const location = useLocation();

  const getUnlockState = () => ({
    bucleFor: Boolean(localStorage.getItem("compruebaConceptualizacionResult")),
    bucleWhile: Boolean(localStorage.getItem("compruebaBucleForResult")),
    actividad: Boolean(localStorage.getItem("compruebaBucleWhileResult")),
  });

  const [unlockState, setUnlockState] = useState(() => getUnlockState());

  useEffect(() => {
    const handleProgressUpdate = () => {
      setUnlockState(getUnlockState());
    };

    window.addEventListener("storage", handleProgressUpdate);
    window.addEventListener("progress-updated", handleProgressUpdate);

    return () => {
      window.removeEventListener("storage", handleProgressUpdate);
      window.removeEventListener("progress-updated", handleProgressUpdate);
    };
  }, []);

  const isBucleForUnlocked = unlockState.bucleFor;
  const isBucleWhileUnlocked = unlockState.bucleWhile;
  const isActividadUnlocked = unlockState.actividad;

  if (location.pathname === "/ar-cam") {
    return (
      <Routes>
        <Route path="/ar-cam" element={<ArCam />} />
      </Routes>
    );
  }

  return (
    <div id="cont-pages">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/bienvenida" replace />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/inicio" element={<Inicio />} />

          <Route
            path="/conceptualizacion/queEsUnBucle"
            element={<QueEsUnBucle />}
          />
          <Route
            path="/conceptualizacion/horaDePracticar"
            element={<PracticarConceptualizacion />}
          />
          <Route
            path="/conceptualizacion/compruebaAprendizaje"
            element={<CompruebaConceptualizacion />}
          />

          <Route
            path="/bucleFor/queEsUnBucleFor"
            element={
              isBucleForUnlocked ? (
                <QueEsUnBucleFor />
              ) : (
                <Navigate
                  to="/conceptualizacion/compruebaAprendizaje"
                  replace
                />
              )
            }
          />
          <Route
            path="/bucleFor/horaDePracticar"
            element={
              isBucleForUnlocked ? (
                <PracticarBucleFor />
              ) : (
                <Navigate
                  to="/conceptualizacion/compruebaAprendizaje"
                  replace
                />
              )
            }
          />
          <Route
            path="/bucleFor/compruebaAprendizaje"
            element={
              isBucleForUnlocked ? (
                <CompruebaBucleFor />
              ) : (
                <Navigate
                  to="/conceptualizacion/compruebaAprendizaje"
                  replace
                />
              )
            }
          />

          <Route
            path="/bucleWhile/queEsUnBucleWhile"
            element={
              isBucleWhileUnlocked ? (
                <QueEsUnBucleWhile />
              ) : (
                <Navigate to="/bucleFor/compruebaAprendizaje" replace />
              )
            }
          />
          <Route
            path="/bucleWhile/horaDePracticar"
            element={
              isBucleWhileUnlocked ? (
                <PracticarBucleWhile />
              ) : (
                <Navigate to="/bucleFor/compruebaAprendizaje" replace />
              )
            }
          />
          <Route
            path="/bucleWhile/compruebaAprendizaje"
            element={
              isBucleWhileUnlocked ? (
                <CompruebaBucleWhile />
              ) : (
                <Navigate to="/bucleFor/compruebaAprendizaje" replace />
              )
            }
          />

          <Route
            path="/actividadRecreativa"
            element={
              isActividadUnlocked ? (
                <ActividadRecreativa />
              ) : (
                <Navigate to="/bucleWhile/compruebaAprendizaje" replace />
              )
            }
          />
          <Route path="/ar-cam" element={<ArCam />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
