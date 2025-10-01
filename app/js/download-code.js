function downloadFileJs() {
  const codeInput = document.getElementById("codeJs");
  if (!codeInput) {
    alert("No se encontró el editor de código (id='codeJs').");
    return;
  }

  const code = codeInput.value.trim();

  if (code.length === 0) {
    alert("El código está vacío. Escribe algo antes de descargar.");
    return;
  }

  try {
    new Function(code);
  } catch (err) {
    alert("El código contiene errores y no puede descargarse:\n\n" + err.message);
    return;
  }

  const blob = new Blob([code], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "script.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
