const codeInput = document.getElementById("codeJs");
const resultDiv = document.getElementById("result");
const lineNumbers = document.getElementById("lineNumbers");
const runButton = document.querySelector(".btn-op button:last-child");

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

function createInputField(label, resolve) {
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "5px";

  const prefix = document.createElement("span");
  prefix.innerHTML = `<b>&gt;</b> ${label} `;
  prefix.style.color = "#3b9149";

  const input = document.createElement("input");
  input.type = "text";
  input.style.background = "#1e1e1e";
  input.style.color = "#d4d4d4";
  input.style.border = "1px solid #555";
  input.style.padding = "2px 5px";
  input.style.borderRadius = "4px";

  wrapper.appendChild(prefix);
  wrapper.appendChild(input);
  resultDiv.appendChild(wrapper);
  resultDiv.scrollTop = resultDiv.scrollHeight;

  input.focus();
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value;
      wrapper.innerHTML = `<span style="color:#3b9149"><b>&gt;</b> ${label} ${val}</span>`;
      resolve(val);
    }
  });
}

async function runCode() {
  const code = codeInput.value;
  resultDiv.innerHTML = "";

  const sandboxConsole = {
    log: (...args) => {
      const msg = args.map(a => {
        try { return typeof a === "object" ? JSON.stringify(a) : String(a); }
        catch { return String(a); }
      }).join(" ");
      appendToConsole(msg, "#3b9149");
    },
    error: (...args) => {
      appendToConsole(args.join(" "), "red");
    }
  };

  const sandboxPrompt = (msg) => {
    return new Promise((resolve) => {
      createInputField(msg, resolve);
    });
  };

  try {
    const asyncWrapper = `(async (console, prompt) => { ${code} })`;
    const func = eval(asyncWrapper);
    await func(sandboxConsole, sandboxPrompt);
  } catch (err) {
    appendToConsole(err && err.stack ? err.stack : String(err), "red");
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
});

window.addEventListener("resize", updateLineNumbers);

runButton.addEventListener("click", runCode);
updateLineNumbers();

runButton.addEventListener("click", async () => {
  await runCode();

  if (window.innerWidth <= 450) {
    const codeContainer = document.querySelector(".code-container");
    const consoleContainer = document.querySelector(".console-container");

    consoleContainer.classList.add("expanded");
    consoleContainer.classList.remove("collapsed");

    codeContainer.classList.add("collapsed");
    codeContainer.classList.remove("expanded");
  }
});