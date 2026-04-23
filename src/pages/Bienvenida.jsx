// Styles
import "../styles/bienvenida.css";

import img from "../assets/img/bienvenida-img1.png";

export default function Bienvenida() {
  return (
    <div className="page-bienvenida">
      <section className="landing-hero">
        <div className="landing-hero__content">
          <span className="landing-hero__badge">Aprende jugando</span>
          <h1 className="landing-hero__title">
            Bienvenidos: explora, aprende y diviértete con bucles.
          </h1>
          <p className="landing-hero__description">
            En este espacio descubrirás cómo los bucles hacen que la programación
            sea más sencilla con ejemplos, práctica y retos guiados.
          </p>
        </div>
        <div className="landing-hero__media">
          <img src={img} alt="Bienvenida" />
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-features__header">
          <h2>¿Qué encontrarás aquí?</h2>
          <p>Recorre el camino completo: aprende, practica y comprueba.</p>
        </div>
        <div className="landing-features__grid">
          <article className="landing-feature">
            <h3>Explicaciones claras</h3>
            <p>
              Conceptos simples y visuales para entender qué es un bucle y cómo
              funciona en la vida real.
            </p>
          </article>
          <article className="landing-feature">
            <h3>Práctica guiada</h3>
            <p>
              Ejercicios paso a paso para afianzar lo aprendido y ganar confianza.
            </p>
          </article>
          <article className="landing-feature">
            <h3>Retos divertidos</h3>
            <p>
              Actividades recreativas para poner a prueba tu lógica y creatividad.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-cta">
        <h2>¿Listo para empezar?</h2>
        <p>Avanza a tu ritmo y celebra cada logro mientras aprendes.</p>
        <a className="landing-cta__button" href="/inicio">
          Empezar la aventura
        </a>
      </section>
    </div>
  );
}
