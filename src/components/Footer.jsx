// Styles
import "../styles/footer.css";

import licencia from "../assets/img/licencia.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__license-image">
          <img src={licencia} alt="Licencia" />
        </div>
        <div className="footer__license-text">
          <p className="footer__license-line">Sanchez Iyui. 2025.</p>
          <p className="footer__license-line">Rivas Pablo. 2026.</p>
        </div>
      </div>
    </footer>
  );
}
