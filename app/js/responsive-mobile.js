document.addEventListener("DOMContentLoaded", () => {
    const codeContainer = document.querySelector(".code-container");
    const consoleContainer = document.querySelector(".console-container");
    const codeTitle = codeContainer.querySelector(".title-section");
    const consoleTitle = consoleContainer.querySelector(".title-section");

    codeContainer.classList.add("expanded");
    consoleContainer.classList.add("collapsed");

    codeTitle.addEventListener("click", () => {
        if (window.innerWidth <= 450) {
            codeContainer.classList.add("expanded");
            codeContainer.classList.remove("collapsed");

            consoleContainer.classList.add("collapsed");
            consoleContainer.classList.remove("expanded");
        }
    });

    consoleTitle.addEventListener("click", () => {
        if (window.innerWidth <= 450) {
            consoleContainer.classList.add("expanded");
            consoleContainer.classList.remove("collapsed");

            codeContainer.classList.add("collapsed");
            codeContainer.classList.remove("expanded");
        }
    });
});
