// Libraries
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Styles
import "../styles/cardExample.css";

export default function CardExample({
  title,
  description,
  code,
  codeDescription,
}) {
  return (
    <div className="card-example">
      <h4 className="card-example__title">{title}</h4>
      <span className="card-example__description">{description}</span>
      <span className="card-example__label">Ejemplo:</span>
      <SyntaxHighlighter language="python" style={oneDark} showLineNumbers>
        {code}
      </SyntaxHighlighter>
      <span className="card-example__code-description">{codeDescription}</span>
    </div>
  );
}
