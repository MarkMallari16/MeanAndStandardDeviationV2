
const resultContainer = document.querySelector(".result-container");

let meanResult = document.getElementById("meanResult");
let standardDeviationResult = document.getElementById("standardDevResult");

const meanFormula = document.getElementById("meanFormula");
const standardDevFormula = document.getElementById("standardDevFormula");



window.addEventListener("DOMContentLoaded", (event) => {
    const main = document.querySelector(".main");
    const spinnerContainer = document.getElementById("spinner-container");

    setTimeout(() => {
        spinnerContainer.classList.add("hide-container");
        main.classList.remove("hide-container");
       
    }, 1500)
});

async function calculate() {
    const inputField = document.getElementById("inputField").value;
    const data = inputField.split(",").map(number => number.trim()).filter(number => number !== "").map(Number);

    let validInput = /^[\d,\s]+$/
    let numbers = data.filter(number => !isNaN(number));
    if (!(validInput.test(inputField)) || numbers.length < 3 || numbers.length > 10) {
        alert("You must enter between 3 and 10 comma-separated numbers!");
        return;
    }


    meanResult.textContent = `${getMean(data).toFixed(2)}`;
    standardDeviationResult.textContent = `${getStandardDeviation(data).toFixed(2)}`;

    meanFormula.innerHTML = "\\(\\text{Mean} = \\frac{1}{n} \\sum_{i=1}^{n} x_i\\)";
    standardDevFormula.innerHTML = "\\(\\text{Standard Deviation} = sqrt{\\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}\\)";

    resultContainer.classList.add("show-result");

    try {
        await MathJax.typesetPromise([meanFormula, standardDevFormula])
    } catch (err) {
        console.error("Error", err);
    }


}
function getMean(numberArray) {
    let sum = 0;
    for (let i = 0; i < numberArray.length; i++) {
        sum += numberArray[i];
    }
    return sum / numberArray.length;
}
function getStandardDeviation(numberArray) {
    let mean = getMean(numberArray);

    const squaredDifferences = numberArray.map(number => Math.pow(number - mean, 2));
    const variance = squaredDifferences.reduce((acc, number) => acc + number, 0) / numberArray.length;
    let standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}