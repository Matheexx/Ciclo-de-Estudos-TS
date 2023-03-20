"use strict";
let contents = [];
let difficultsNumber = [];
let difficultsString = [];
const selectContents = window.document.getElementById("selectContents");
const result = window.document.getElementsByClassName("result")[0];
function addContent() {
    const inputContent = window.document.getElementById('inputContent');
    const optionsDifficult = window.document.getElementsByClassName("optionDifficult");
    const difficult1 = optionsDifficult[0];
    const difficult2 = optionsDifficult[1];
    const difficult3 = optionsDifficult[2];
    const difficult4 = optionsDifficult[3];
    const difficult5 = optionsDifficult[4];
    if (verifyInputContent(inputContent) && verifyContentAddedBefore(inputContent) && verifySelectOption(difficult1, difficult2, difficult3, difficult4, difficult5)) {
        result.innerHTML = "<h2>Resultado:</h2>";
        const content = inputContent.value;
        contents.push(content);
        const difficultNumber = returnSelectOption(difficult1, difficult2, difficult3, difficult4, difficult5)[0];
        difficultsNumber.push(difficultNumber);
        const difficultString = returnSelectOption(difficult1, difficult2, difficult3, difficult4, difficult5)[1];
        difficultsString.push(difficultString);
        const color = colorsDifficult(difficultString);
        const optionContent = window.document.createElement("option");
        optionContent.text = `${content} - ${difficultString}`;
        optionContent.setAttribute("style", `color: ${color}`);
        selectContents.appendChild(optionContent);
    }
    else {
        window.alert("Complete com as informações corretamente");
    }
    inputContent.value = "";
}
function removeContent() {
    result.innerHTML = "<h2>Resultado:</h2>";
    contents.pop();
    selectContents.remove(contents.length);
}
function clearContents() {
    result.innerHTML = "<h2>Resultado:</h2>";
    contents = [];
    difficultsNumber = [];
    difficultsString = [];
    selectContents.innerHTML = "";
}
function fSubmit() {
    result.innerHTML = "<h2>Resultado:</h2>";
    const inputHours = window.document.getElementById("inputHours");
    if (verifyInputHours(inputHours)) {
        if (verifyContents()) {
            const valueTotalDifficultsNumber = sumDifficultsNumber();
            const hoursPerDay = Number(inputHours.value);
            const hoursPerWeek = hoursPerDay * 7;
            const hoursPerCycle = hoursPerWeek / valueTotalDifficultsNumber;
            result.innerHTML += "<ul>";
            for (let i = 0; i <= contents.length - 1; i++) {
                let hoursPerContent = hoursPerCycle * difficultsNumber[i];
                result.innerHTML += `<li><span style="color: ${colorsDifficult(difficultsString[i])};">${contents[i]}</span> - ${hoursPerContent.toFixed().replace(/\.?0+$/, "")} horas devem ser estudadas por ciclo.</li>`;
            }
            result.innerHTML += "</ul>";
        }
        else {
            window.alert("Não foi adicionada matérias à lista");
        }
    }
    else {
        window.alert("Quantidade de horas diárias inválida!");
        inputHours.value = "";
    }
}
function verifyInputContent(inputContent) {
    return !!(inputContent.value.length);
}
function verifyInputHours(inputHours) {
    return !!(inputHours.value.length && Number(inputHours.value) >= 1 && Number(inputHours.value) <= 12);
}
function verifyContents() {
    return !!(contents.length);
}
function sumDifficultsNumber() {
    let sum = 0;
    for (let i = 0; i <= difficultsNumber.length - 1; i++) {
        sum += difficultsNumber[i];
    }
    return sum;
}
function verifyContentAddedBefore(inputContent) {
    if (contents.indexOf(inputContent.value) !== -1) {
        window.alert("Este conteúdo já está na lista");
        return false;
    }
    return true;
}
function verifySelectOption(difficult1, difficult2, difficult3, difficult4, difficult5) {
    return (difficult1.selected || difficult2.selected || difficult3.selected || difficult4.selected || difficult5.selected);
}
function returnSelectOption(difficult1, difficult2, difficult3, difficult4, difficult5) {
    if (difficult1.selected) {
        return [1, "Ótimo"];
    }
    else if (difficult2.selected) {
        return [2, "Bom"];
    }
    else if (difficult3.selected) {
        return [3, "Razoável"];
    }
    else if (difficult4.selected) {
        return [4, "Ruim"];
    }
    else if (difficult5.selected) {
        return [5, "Péssimo"];
    }
    else {
        return [NaN, ""];
    }
}
function colorsDifficult(difficultString) {
    switch (difficultString) {
        case "Ótimo":
            return "rgb(64, 64, 255)";
        case "Bom":
            return "rgb(64, 255, 64)";
        case "Razoável":
            return "rgb(218, 218, 18)";
        case "Ruim":
            return "rgb(246, 154, 7)";
        case "Péssimo":
            return "rgb(223, 44, 44)";
        default:
            return "black";
    }
}
