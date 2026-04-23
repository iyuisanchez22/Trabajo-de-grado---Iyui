// Estilos
import "../styles/nav.css";

// React y librerías
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Componentes
import ButtonNav from "./ButtonNav.jsx";
import SettingsModal from "./SettingsModal.jsx";

// Imagenes
import flechaLink from "../assets/img/flecha-link.png";
import settingsImg from "../assets/img/settings.png";
import arowImg from "../assets/img/flecha.png";
import bloqueadoImg from "../assets/img/bloquear.png";

const DROPDOWN_IDS = {
  CONCEPTUALIZACION: "conceptualizacion",
  BUCLE_FOR: "bucleFor",
  BUCLE_WHILE: "bucleWhile",
};

export default function Nav() {
  const location = useLocation();
  const navRef = useRef(null);
  const [pinnedDropdown, setPinnedDropdown] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const settingsDropdownRef = useRef(null);

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

  const isBucleForLocked = !unlockState.bucleFor;
  const isBucleWhileLocked = !unlockState.bucleWhile;
  const isActividadLocked = !unlockState.actividad;

  const isDropdownLocked = (id) => {
    if (id === DROPDOWN_IDS.BUCLE_FOR) return isBucleForLocked;
    if (id === DROPDOWN_IDS.BUCLE_WHILE) return isBucleWhileLocked;
    return false;
  };

  const isDropdownOpen = (id) =>
    pinnedDropdown === id || (!pinnedDropdown && hoveredDropdown === id);

  const handleDropdownTriggerClick = (id) => {
    if (isDropdownLocked(id)) return;
    setPinnedDropdown((prev) => (prev === id ? null : id));
  };

  const handleDropdownMouseEnter = (id) => {
    if (isDropdownLocked(id)) return;
    setHoveredDropdown(id);
  };

  const handleDropdownMouseLeave = () => {
    setHoveredDropdown(null);
  };

  const closeDropdown = useCallback(() => {
    setPinnedDropdown(null);
    setHoveredDropdown(null);
  }, []);

  const handleSettingsDropdownClick = () => {
    setIsSettingsDropdownOpen((prev) => !prev);
  };

  const handleSettingsOptionClick = (modalType) => {
    setActiveModal(modalType);
    setIsSettingsDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleDropdownLinkClick = (to) => (e) => {
    closeDropdown();
    if (location.pathname === to) e.preventDefault();
  };

  // Cerrar dropdown al hacer clic fuera del dropdown específico
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar settings dropdown solo si el clic está completamente fuera
      if (isSettingsDropdownOpen && settingsDropdownRef.current) {
        // Verificar si el clic está en el botón o dentro del dropdown
        const isClickInsideButton = event.target.closest(".settings-btn");
        const isClickInsideDropdown =
          event.target.closest(".settings-dropdown");

        // Solo cerrar si el clic está completamente afuera
        if (!isClickInsideButton && !isClickInsideDropdown) {
          setIsSettingsDropdownOpen(false);
        }
      }

      if (pinnedDropdown) {
        const clickedElement = event.target;

        // Verificar si el clic está dentro del contenido del dropdown desktop
        const dropdownContent = clickedElement.closest(
          ".dropdown-content.dropdown-open",
        );

        // Verificar si el clic está en un botón del acordeón móvil
        const mobileAccordionTrigger = clickedElement.closest(
          ".menu-accordion-trigger",
        );

        // Verificar si el clic está en un botón trigger del dropdown desktop
        const desktopTrigger = clickedElement.closest(
          ".button-nav-wrapper .btn-nav",
        );

        // Si el clic no está en dropdown desktop, ni en triggers, cerrar
        if (!dropdownContent && !mobileAccordionTrigger && !desktopTrigger) {
          closeDropdown();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pinnedDropdown, closeDropdown, isSettingsDropdownOpen]);

  // Helper para crear Links del dropdown con accesibilidad condicional
  const createDropdownLink = (to, children, dropdownId, isLocked = false) => {
    const isOpen = isDropdownOpen(dropdownId);
    if (isLocked) {
      return (
        <span
          className="dropdown-link dropdown-link--locked"
          tabIndex={-1}
          aria-disabled="true"
          aria-hidden={!isOpen}
        >
          {children}
          <img src={bloqueadoImg} alt="" className="dropdown-lock-icon" />
        </span>
      );
    }

    return (
      <Link
        to={to}
        onClick={handleDropdownLinkClick(to)}
        tabIndex={isOpen ? undefined : -1}
        aria-hidden={!isOpen}
      >
        {children}
      </Link>
    );
  };

  // Estado para el menú hamburguesa
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (!next) closeDropdown();
      return next;
    });
  };

  const handleMobileLinkClick = (to) => (e) => {
    closeDropdown();
    setIsMenuOpen(false);
    if (location.pathname === to) e.preventDefault();
  };

  return (
    <nav ref={navRef}>
      <div className="header-nav">
        <Link
          to="/bienvenida"
          className="nav-title-link"
          aria-label="Ir al inicio"
          title="Ir al inicio"
          onClick={closeDropdown}
        >
          <h1>Aprendiendo sobre bucles en Scratch</h1>
        </Link>
        <div className="cont-links">
          <ButtonNav
            text="Bienvenida"
            to="/bienvenida"
            withArrow={false}
            onClick={closeDropdown}
            isActive={location.pathname === "/bienvenida"}
          />
          <ButtonNav
            text="Inicio"
            to="/inicio"
            withArrow={false}
            onClick={closeDropdown}
            isActive={location.pathname === "/inicio"}
          />
          <ButtonNav
            text="Conceptualización"
            dropdownId={DROPDOWN_IDS.CONCEPTUALIZACION}
            withArrow={true}
            isOpen={isDropdownOpen(DROPDOWN_IDS.CONCEPTUALIZACION)}
            isActive={location.pathname.startsWith("/conceptualizacion")}
            onTriggerClick={() =>
              handleDropdownTriggerClick(DROPDOWN_IDS.CONCEPTUALIZACION)
            }
            onMouseEnter={() =>
              handleDropdownMouseEnter(DROPDOWN_IDS.CONCEPTUALIZACION)
            }
            onMouseLeave={handleDropdownMouseLeave}
            dropdownContent={
              <>
                {createDropdownLink(
                  "/conceptualizacion/queEsUnBucle",
                  <>
                    <div>
                      <p>¿Qué es un bucle?</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Explicación básica de qué es un bucle y cómo se usa para
                      repetir acciones en programación y Scratch.
                    </span>
                  </>,
                  DROPDOWN_IDS.CONCEPTUALIZACION,
                )}
                {createDropdownLink(
                  "/conceptualizacion/horaDePracticar",
                  <>
                    <div>
                      <p>Llegó la hora de practicar</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Sección de actividades y ejercicios donde aplicar lo
                      aprendido sobre bucles mediante ejemplos prácticos e
                      interactivos.
                    </span>
                  </>,
                  DROPDOWN_IDS.CONCEPTUALIZACION,
                )}
                {createDropdownLink(
                  "/conceptualizacion/compruebaAprendizaje",
                  <>
                    <div>
                      <p>Comprueba tu aprendizaje</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Espacio para evaluar lo aprendido sobre los bucles
                      mediante preguntas y actividades de repaso.
                    </span>
                  </>,
                  DROPDOWN_IDS.CONCEPTUALIZACION,
                )}
              </>
            }
          />
          <ButtonNav
            text="Bucle for"
            dropdownId={DROPDOWN_IDS.BUCLE_FOR}
            withArrow={true}
            isOpen={isDropdownOpen(DROPDOWN_IDS.BUCLE_FOR)}
            isActive={location.pathname.startsWith("/bucleFor")}
            onTriggerClick={() =>
              handleDropdownTriggerClick(DROPDOWN_IDS.BUCLE_FOR)
            }
            onMouseEnter={() =>
              handleDropdownMouseEnter(DROPDOWN_IDS.BUCLE_FOR)
            }
            onMouseLeave={handleDropdownMouseLeave}
            disabled={isBucleForLocked}
            lockIconSrc={bloqueadoImg}
            dropdownContent={
              <>
                {createDropdownLink(
                  "/bucleFor/queEsUnBucleFor",
                  <>
                    <div>
                      <p>¿Qué es un bucle For?</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Explicación sencilla del bucle for y cómo se utiliza para
                      repetir acciones un número determinado de veces en
                      programación y Scratch.
                    </span>
                  </>,
                  DROPDOWN_IDS.BUCLE_FOR,
                  isBucleForLocked,
                )}
                {createDropdownLink(
                  "/bucleFor/horaDePracticar",
                  <>
                    <div>
                      <p>Llegó la hora de practicar</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Sección de actividades y ejercicios donde aplicar lo
                      aprendido sobre bucles mediante ejemplos prácticos e
                      interactivos.
                    </span>
                  </>,
                  DROPDOWN_IDS.BUCLE_FOR,
                  isBucleForLocked,
                )}
                {createDropdownLink(
                  "/bucleFor/compruebaAprendizaje",
                  <>
                    <div>
                      <p>Comprueba tu aprendizaje</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Espacio para evaluar lo aprendido sobre los bucles
                      mediante preguntas y actividades de repaso.
                    </span>
                  </>,
                  DROPDOWN_IDS.BUCLE_FOR,
                  isBucleForLocked,
                )}
              </>
            }
          />
          <ButtonNav
            text="Bucle while"
            dropdownId={DROPDOWN_IDS.BUCLE_WHILE}
            withArrow={true}
            isOpen={isDropdownOpen(DROPDOWN_IDS.BUCLE_WHILE)}
            isActive={location.pathname.startsWith("/bucleWhile")}
            onTriggerClick={() =>
              handleDropdownTriggerClick(DROPDOWN_IDS.BUCLE_WHILE)
            }
            onMouseEnter={() =>
              handleDropdownMouseEnter(DROPDOWN_IDS.BUCLE_WHILE)
            }
            onMouseLeave={handleDropdownMouseLeave}
            disabled={isBucleWhileLocked}
            lockIconSrc={bloqueadoImg}
            dropdownContent={
              <>
                {createDropdownLink(
                  "/bucleWhile/queEsUnBucleWhile",
                  <>
                    <div>
                      <p>¿Qué es un bucle While?</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Explicación básica de qué es un bucle while y cómo se usa
                      para repetir acciones mientras se cumple una condición en
                      programación y en Scratch.
                    </span>
                  </>,
                  DROPDOWN_IDS.BUCLE_WHILE,
                  isBucleWhileLocked,
                )}
                {createDropdownLink(
                  "/bucleWhile/horaDePracticar",
                  <>
                    <div>
                      <p>Llegó la hora de practicar</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Sección de actividades y ejercicios donde aplicar lo
                      aprendido sobre bucles while mediante ejemplos prácticos e
                      interactivos.
                    </span>
                  </>,
                  DROPDOWN_IDS.BUCLE_WHILE,
                  isBucleWhileLocked,
                )}
                {createDropdownLink(
                  "/bucleWhile/compruebaAprendizaje",
                  <>
                    <div>
                      <p>Comprueba tu aprendizaje</p>
                      <img src={flechaLink} alt="" />
                    </div>
                    <span>
                      Espacio para evaluar lo aprendido sobre los bucles while
                      mediante preguntas y actividades de repaso.
                    </span>
                  </>,
                  DROPDOWN_IDS.BUCLE_WHILE,
                  isBucleWhileLocked,
                )}
              </>
            }
          />
          <ButtonNav
            text="Actividad recreativa"
            to="/actividadRecreativa"
            withArrow={false}
            onClick={closeDropdown}
            disabled={isActividadLocked}
            lockIconSrc={bloqueadoImg}
            isActive={location.pathname === "/actividadRecreativa"}
          />
        </div>
        <button
          onClick={handleMenuToggle}
          className={`menu-hamburger-btn ${isMenuOpen ? "menu-open" : ""}`}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="settings-btn-wrapper" ref={settingsDropdownRef}>
          <button
            onClick={handleSettingsDropdownClick}
            className="settings-btn"
            aria-expanded={isSettingsDropdownOpen}
            aria-haspopup="true"
          >
            <img src={settingsImg} alt="Settings" />
          </button>
          <AnimatePresence>
            {isSettingsDropdownOpen && (
              <motion.div
                className="settings-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="settings-dropdown-item"
                  onClick={() => handleSettingsOptionClick("objetivos")}
                >
                  Objetivos
                </button>
                <button
                  type="button"
                  className="settings-dropdown-item"
                  onClick={() => handleSettingsOptionClick("licencia")}
                >
                  Licencia
                </button>
                <button
                  type="button"
                  className="settings-dropdown-item"
                  onClick={() => handleSettingsOptionClick("creditos")}
                >
                  Créditos
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu hamburguesa */}
      <motion.div
        className="cont-menu-hamburguer"
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-hidden={!isMenuOpen}
      >
        <div className="menu-hamburger-inner">
          <Link
            to="/bienvenida"
            className="menu-link"
            onClick={handleMobileLinkClick("/bienvenida")}
          >
            Bienvenida
          </Link>
          <Link
            to="/inicio"
            className="menu-link"
            onClick={handleMobileLinkClick("/inicio")}
          >
            Inicio
          </Link>

          <div className="menu-accordion">
            <button
              type="button"
              className="menu-accordion-trigger"
              aria-expanded={isDropdownOpen(DROPDOWN_IDS.CONCEPTUALIZACION)}
              onClick={() =>
                handleDropdownTriggerClick(DROPDOWN_IDS.CONCEPTUALIZACION)
              }
            >
              Conceptualización
              <motion.img
                src={arowImg}
                alt=""
                animate={{
                  rotateX: isDropdownOpen(DROPDOWN_IDS.CONCEPTUALIZACION)
                    ? 180
                    : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </button>
            <AnimatePresence mode="wait">
              {isDropdownOpen(DROPDOWN_IDS.CONCEPTUALIZACION) && (
                <motion.div
                  key="conceptualizacion-accordion"
                  className="menu-accordion-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    to="/conceptualizacion/queEsUnBucle"
                    onClick={handleMobileLinkClick(
                      "/conceptualizacion/queEsUnBucle",
                    )}
                  >
                    ¿Qué es un bucle?
                  </Link>
                  <Link
                    to="/conceptualizacion/horaDePracticar"
                    onClick={handleMobileLinkClick(
                      "/conceptualizacion/horaDePracticar",
                    )}
                  >
                    Llegó la hora de practicar
                  </Link>
                  <Link
                    to="/conceptualizacion/compruebaAprendizaje"
                    onClick={handleMobileLinkClick(
                      "/conceptualizacion/compruebaAprendizaje",
                    )}
                  >
                    Comprueba tu aprendizaje
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="menu-accordion">
            <button
              type="button"
              className={`menu-accordion-trigger ${
                isBucleForLocked ? "menu-accordion-trigger--locked" : ""
              }`}
              aria-expanded={isDropdownOpen(DROPDOWN_IDS.BUCLE_FOR)}
              onClick={() => handleDropdownTriggerClick(DROPDOWN_IDS.BUCLE_FOR)}
              aria-disabled={isBucleForLocked}
              disabled={isBucleForLocked}
            >
              Bucle for
              {isBucleForLocked ? (
                <img src={bloqueadoImg} alt="" className="menu-lock-icon" />
              ) : (
                <motion.img
                  src={arowImg}
                  alt=""
                  animate={{
                    rotateX: isDropdownOpen(DROPDOWN_IDS.BUCLE_FOR) ? 180 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </button>
            <AnimatePresence mode="wait">
              {isDropdownOpen(DROPDOWN_IDS.BUCLE_FOR) && (
                <motion.div
                  key="bucle-for-accordion"
                  className="menu-accordion-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    to="/bucleFor/queEsUnBucleFor"
                    onClick={handleMobileLinkClick("/bucleFor/queEsUnBucleFor")}
                  >
                    ¿Qué es un bucle For?
                  </Link>
                  <Link
                    to="/bucleFor/horaDePracticar"
                    onClick={handleMobileLinkClick("/bucleFor/horaDePracticar")}
                  >
                    Llegó la hora de practicar
                  </Link>
                  <Link
                    to="/bucleFor/compruebaAprendizaje"
                    onClick={handleMobileLinkClick(
                      "/bucleFor/compruebaAprendizaje",
                    )}
                  >
                    Comprueba tu aprendizaje
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="menu-accordion">
            <button
              type="button"
              className={`menu-accordion-trigger ${
                isBucleWhileLocked ? "menu-accordion-trigger--locked" : ""
              }`}
              aria-expanded={isDropdownOpen(DROPDOWN_IDS.BUCLE_WHILE)}
              onClick={() =>
                handleDropdownTriggerClick(DROPDOWN_IDS.BUCLE_WHILE)
              }
              aria-disabled={isBucleWhileLocked}
              disabled={isBucleWhileLocked}
            >
              Bucle while
              {isBucleWhileLocked ? (
                <img src={bloqueadoImg} alt="" className="menu-lock-icon" />
              ) : (
                <motion.img
                  src={arowImg}
                  alt=""
                  animate={{
                    rotateX: isDropdownOpen(DROPDOWN_IDS.BUCLE_WHILE) ? 180 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </button>
            <AnimatePresence mode="wait">
              {isDropdownOpen(DROPDOWN_IDS.BUCLE_WHILE) && (
                <motion.div
                  key="bucle-while-accordion"
                  className="menu-accordion-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    to="/bucleWhile/queEsUnBucleWhile"
                    onClick={handleMobileLinkClick(
                      "/bucleWhile/queEsUnBucleWhile",
                    )}
                  >
                    ¿Qué es un bucle While?
                  </Link>
                  <Link
                    to="/bucleWhile/horaDePracticar"
                    onClick={handleMobileLinkClick(
                      "/bucleWhile/horaDePracticar",
                    )}
                  >
                    Llegó la hora de practicar
                  </Link>
                  <Link
                    to="/bucleWhile/compruebaAprendizaje"
                    onClick={handleMobileLinkClick(
                      "/bucleWhile/compruebaAprendizaje",
                    )}
                  >
                    Comprueba tu aprendizaje
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isActividadLocked ? (
            <span className="menu-link menu-link--locked" aria-disabled="true">
              Actividad recreativa
              <img src={bloqueadoImg} alt="" className="menu-lock-icon" />
            </span>
          ) : (
            <Link
              to="/actividadRecreativa"
              className="menu-link"
              onClick={handleMobileLinkClick("/actividadRecreativa")}
            >
              Actividad recreativa
            </Link>
          )}
        </div>
      </motion.div>
      <SettingsModal
        isOpen={activeModal !== null}
        modalType={activeModal}
        onClose={handleCloseModal}
      />
    </nav>
  );
}
