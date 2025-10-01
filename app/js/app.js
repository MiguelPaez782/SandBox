const codeInput = document.getElementById("codeJs");
const resultDiv = document.getElementById("result");
const lineNumbers = document.getElementById("lineNumbers");

function runCode() {
  const code = codeInput.value;
  resultDiv.innerHTML = "";

  const originalLog = console.log;
  try {
    console.log = function (...args) {
      const msg = args.map(a => {
        try { return typeof a === "object" ? JSON.stringify(a) : String(a); }
        catch { return String(a); }
      }).join(" ");
      
      const line = document.createElement("div");

      const prefix = document.createElement("span");
      prefix.innerHTML = "<b>&gt;</b> ";
      prefix.style.color = "#3b9149";

      line.appendChild(prefix);
      line.appendChild(document.createTextNode(msg));

      resultDiv.appendChild(line);
      originalLog.apply(console, args);
    };

    new Function(code)();
  } catch (err) {
    const errorEl = document.createElement("div");

    const prefix = document.createElement("span");
    prefix.innerHTML = "<b>&gt;</b> ";
    prefix.style.color = "red";

    errorEl.appendChild(prefix);
    errorEl.appendChild(document.createTextNode(err && err.stack ? err.stack : String(err)));
    resultDiv.appendChild(errorEl);
  } finally {
    console.log = originalLog;
  }
}

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
  runCode();
});

window.addEventListener("resize", updateLineNumbers);

updateLineNumbers();
runCode();