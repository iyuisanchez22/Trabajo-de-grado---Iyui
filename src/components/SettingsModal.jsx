import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/settingsModal.css";

import licenciaImage from "../assets/img/licencia.png";
import creditosImage from "../assets/img/creditos.jpeg";

export default function SettingsModal({ isOpen, modalType, onClose }) {
  const getModalContent = () => {
    switch (modalType) {
      case "objetivos":
        return {
          title: "Objetivos",
          content: (
            <div className="modal-content-text">
              <h3>Objetivo General</h3>
              <p>
                Fortalecer el pensamiento lógico y computacional en la población
                estudiantil de séptimo grado del Colegio de Boyacá mediante la
                exploración y aplicación de los bucles for y while, utilizando
                el entorno de programación visual Scratch para representar
                procesos repetitivos, resolver problemas secuenciales y fomentar
                la creatividad algorítmica.
              </p>
              <h3>Objetivos Específicos</h3>
              <ul>
                <li>
                  Identificar problemas y soluciones relacionados con el uso de
                  bucles for y while en la programación visual, reconociendo
                  errores comunes, estructuras lógicas y estrategias para
                  mejorar la comprensión algorítmica.
                </li>
                <li>
                  Comprender la estructura y funcionamiento de los bucles for y
                  while mediante el uso de textos explicativos, pseudocódigo y
                  representaciones visuales en Scratch que faciliten la
                  conceptualización lógica.
                </li>
                <li>
                  Analizar los efectos que puede tener el uso incorrecto de
                  bucles for y while en la ejecución de programas, identificando
                  riesgos como bucles infinitos, condiciones mal formuladas y
                  errores de lógica.
                </li>
              </ul>
            </div>
          ),
        };

      case "licencia":
        return {
          title: "Licencia",
          content: (
            <div className="modal-content-license">
              <div className="license-image-placeholder">
                <img src={licenciaImage} alt="Licencia" />
              </div>
              <p>
                Sólo se permite descargar la obra y compartirla con otras
                entidades siempre y cuando se dé crédito, pero no se permite
                cambiar, modificar o transformar de forma alguna esta obra. Se
                prohíbe el lucro en base a esta obra u obras derivadas de la
                misma.
              </p>
            </div>
          ),
        };

      case "creditos":
        return {
          title: "Créditos",
          content: (
            <div className="modal-content-credits">
              <div className="credits-image-placeholder">
                <img src={creditosImage} alt="Créditos" />
              </div>
              <div className="credits-text">
                <p>
                  <strong>Iyui Shaio Sanchez Melo</strong>
                </p>
                <p>Universidad Pedagógica y Tecnológica de Colombia</p>
                <p>Trabajo de Grado</p>
                <p>Colegio de Boyacá - Sección José Ignacio de Márquez</p>
                <p>
                  <strong>Semestre:</strong> Décimo
                </p>
                <p>
                  <strong>Correo electrónico:</strong> iyui.sanchez@uptc.edu.co
                </p>
                <p>2026</p>
              </div>
            </div>
          ),
        };

      default:
        return { title: "", content: null };
    }
  };

  const modal = getModalContent();

  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      modal
      closeOnDocumentClick
      overlayClassName="modal-overlay"
      className="modal-container"
    >
      <div className="modal-header">
        <h2>{modal.title}</h2>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
      <div className="modal-body">{modal.content}</div>
    </Popup>
  );
}
