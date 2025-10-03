export function OutputCard({ text }) {
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        maxWidth: "600px",
        background: "black",
        fontFamily: "sans-serif",
         // so \n works as line breaks
      }}
    >
      {text}
    </div>
  );
}