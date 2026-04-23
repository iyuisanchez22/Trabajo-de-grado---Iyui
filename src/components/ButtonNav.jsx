import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/buttonNav.css";

import flechaImg from "../assets/img/flecha.png";

export default function ButtonNav({
  text,
  to,
  onClick,
  withArrow,
  dropdownContent,
  dropdownId,
  isOpen,
  onTriggerClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  lockIconSrc,
  isActive = false,
}) {
  const isControlledDropdown = withArrow && dropdownId != null;
  const open = isControlledDropdown ? isOpen : false;

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (withArrow) {
      e.preventDefault();
      if (onTriggerClick) {
        onTriggerClick();
      }
    } else if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    if (withArrow && onMouseEnter) {
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    if (withArrow && onMouseLeave) {
      onMouseLeave();
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (withArrow && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      if (onTriggerClick) {
        onTriggerClick();
      }
    }
  };

  const triggerClasses = `btn-nav ${open ? "dropdown-open" : ""} ${
    disabled ? "btn-nav--locked" : ""
  } ${isActive && !disabled ? "btn-nav--active" : ""}`;

  return (
    <div
      className={`button-nav-wrapper ${open ? "dropdown-active" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {withArrow ? (
        <button
          type="button"
          className={triggerClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-expanded={open}
          aria-haspopup="true"
          aria-disabled={disabled}
          disabled={disabled}
        >
          <span>{text}</span>
          <img
            src={disabled && lockIconSrc ? lockIconSrc : flechaImg}
            alt=""
            className={`arrow-btn-nav ${
              open && !disabled ? "arrow-rotated" : ""
            } ${disabled ? "arrow-btn-nav--locked" : ""}`}
          />
        </button>
      ) : (
        <>
          {disabled ? (
            <span className={triggerClasses} aria-disabled="true">
              <span>{text}</span>
              {lockIconSrc && (
                <img src={lockIconSrc} alt="" className="btn-nav-lock-icon" />
              )}
            </span>
          ) : (
            <Link
              to={to || "#"}
              className={triggerClasses}
              onClick={handleClick}
            >
              <span>{text}</span>
            </Link>
          )}
        </>
      )}
      {withArrow && dropdownContent && (
        <div className={`dropdown-content ${open ? "dropdown-open" : ""}`}>
          <div className="dropdown-inner">{dropdownContent}</div>
        </div>
      )}
    </div>
  );
}

ButtonNav.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  withArrow: PropTypes.bool,
  dropdownContent: PropTypes.node,
  dropdownId: PropTypes.string,
  isOpen: PropTypes.bool,
  onTriggerClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  disabled: PropTypes.bool,
  lockIconSrc: PropTypes.string,
  isActive: PropTypes.bool,
};
