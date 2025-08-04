const display = document.getElementById("display");
let expression = "0";

function updateDisplay() {
    display.textContent = expression;
}

function handlePercentage(expr) {
    return expr.replace(
        /(\d+(\.\d+)?)%(\d+(\.\d+)?)/g,
        (_, num1, _d1, num2) => {
            return `(${num1}*(${num2}/100))`;
        }
    );
}

function evaluateExpression() {
    try {
        const safeExpr = handlePercentage(
            expression.replace(/×/g, "*").replace(/÷/g, "/")
        );
        const result = Function(`"use strict"; return (${safeExpr})`)();
        expression = result.toString();
    } catch (error) {
        expression = "Error";
    }
    updateDisplay();
}

function handleButtonClick(value) {
    if (expression === "Error") expression = "0";

    if (value === "AC") {
        expression = "0";
    } else if (value === "DEL") {
        expression = expression.slice(0, -1) || "0";
    } else if (value === "=") {
        evaluateExpression();
        return;
    } else if (value === ".") {
        const lastNum = expression.split(/[\+\-\*\/]/).pop();
        if (!lastNum.includes(".")) {
            expression += ".";
        }
    } else {
        if (expression === "0" && !isNaN(value)) {
            expression = value;
        } else {
            expression += value;
        }
    }

    updateDisplay();
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        handleButtonClick(btn.textContent);
    });
});

document.addEventListener("keydown", e => {
    const key = e.key;

    if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "."].includes(key)) {
        handleButtonClick(key);
    } else if (key === "Enter" || key === "=") {
        handleButtonClick("=");
    } else if (key === "Backspace") {
        handleButtonClick("DEL");
    } else if (key === "Delete") {
        handleButtonClick("AC");
    } else if (key === "%") {
        handleButtonClick("%");
    }
});

document.getElementById("themeToggle").addEventListener("change", e => {
    document.body.classList.toggle("dark", e.target.checked);
});
