// Libraries
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Styles
import "../styles/cardExaPseudo.css";

export default function CardExaPseudo({ explain, title, img, example, code }) {
  return (
    <div className="card-pseudo">
      <div className="cont-content-pseudo">
        <span className="explain">{explain}</span>
        <div>
          <h4>{title}</h4>
          <span>
            <strong>Ejemplo: </strong>
            {example}
          </span>
        </div>
        <img src={img} alt="" />
      </div>
      <SyntaxHighlighter language="python" style={oneDark} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
