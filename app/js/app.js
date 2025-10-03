const codeInput = document.getElementById("codeJs");
const resultDiv = document.getElementById("result");
const lineNumbers = document.getElementById("lineNumbers");
const runButton = document.querySelector(".btn-op button:last-child"); // tu botón Run

// Función para imprimir en consola (logs)
function appendToConsole(message, color = "#d4d4d4") {
  const line = document.createElement("div");

  const prefix = document.createElement("span");
  prefix.innerHTML = "<b>&gt;</b> ";
  prefix.style.color = color;

  line.appendChild(prefix);
  line.appendChild(document.createTextNode(message));
  resultDiv.appendChild(line);
  resultDiv.scrollTop = resultDiv.scrollHeight;
}

// Sobrescribir console.log y prompt dentro del sandbox
function createSandboxedFunction(code) {
  return new Function("console", "prompt", code);
}

function runCode() {
  const code = codeInput.value;
  resultDiv.innerHTML = "";

  const sandboxConsole = {
    log: (...args) => {
      const msg = args.map(a => {
        try {
          return typeof a === "object" ? JSON.stringify(a) : String(a);
        } catch {
          return String(a);
        }
      }).join(" ");
      appendToConsole(msg, "#3b9149");
    },
    error: (...args) => {
      appendToConsole(args.join(" "), "red");
    }
  };

  const sandboxPrompt = (msg) => {
    const userInput = window.prompt(msg);
    appendToConsole(`${msg} ${userInput}`, "#ffcc00");
    return userInput;
  };

  try {
    const func = createSandboxedFunction(code);
    func(sandboxConsole, sandboxPrompt);
  } catch (err) {
    appendToConsole(err && err.stack ? err.stack : String(err), "red");
  }
}

// Actualiza los números de línea
function updateLineNumbers() {
  const lines = codeInput.value.split("\n").length;
  const nums = Array.from({ length: lines }, (_, i) => i + 1);
  lineNumbers.textContent = nums.join("\n");
  lineNumbers.style.height = codeInput.scrollHeight + "px";
}

codeInput.addEventListener("scroll", () => {
  lineNumbers.scrollTop = codeInput.scrollTop;
});

codeInput.addEventListener("input", () => {
  updateLineNumbers();
});

window.addEventListener("resize", updateLineNumbers);

// Vincular botón Run
runButton.addEventListener("click", runCode);

// Inicialización
updateLineNumbers();