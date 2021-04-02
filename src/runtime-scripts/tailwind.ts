// we cannot import it a document_start idle since there is no head. we could inject into html directly but it will bloat the namespace
// do not import base since that includes preflight reset css and will conflict with the original theme
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
