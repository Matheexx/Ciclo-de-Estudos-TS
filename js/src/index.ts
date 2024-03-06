let contents:string[] = [];

let difficultsNumber:number[] = [];
let difficultsString:string[] = [];

const selectContents:HTMLSelectElement = window.document.getElementById("selectContents") as HTMLSelectElement;

const result:HTMLDivElement = window.document.getElementsByClassName("result")[0] as HTMLDivElement;

function addContent():void {
    const inputContent:HTMLInputElement = window.document.getElementById('inputContent') as HTMLInputElement;
    const optionsDifficult:HTMLOptionsCollection = window.document.getElementsByClassName("optionDifficult") as HTMLOptionsCollection;

    const difficult1:HTMLOptionElement = optionsDifficult[0];
    const difficult2:HTMLOptionElement = optionsDifficult[1];
    const difficult3:HTMLOptionElement = optionsDifficult[2];
    const difficult4:HTMLOptionElement = optionsDifficult[3];
    const difficult5:HTMLOptionElement = optionsDifficult[4];

    if (verifyInputContent(inputContent) && verifyContentAddedBefore(inputContent) && verifySelectOption(difficult1, difficult2, difficult3, difficult4, difficult5)) {
        result.innerHTML = "<h2>Resultado:</h2>";
        const content:string = inputContent.value;
        contents.push(content);

        const difficultNumber:number = returnSelectOption(difficult1, difficult2, difficult3, difficult4, difficult5)[0];
        difficultsNumber.push(difficultNumber);
        const difficultString:string = returnSelectOption(difficult1, difficult2, difficult3, difficult4, difficult5)[1];
        difficultsString.push(difficultString);

        const color:string = colorsDifficult(difficultString);

        const optionContent:HTMLOptionElement = window.document.createElement("option");
        optionContent.text = `${content} - ${difficultString}`;
        optionContent.classList.add(color);

        selectContents.appendChild(optionContent);
    } else {
        window.alert("Complete com as informações corretamente");
    }
    inputContent.value = "";
}

function removeContent():void {
    result.innerHTML = "<h2>Resultado:</h2>";
    contents.pop();
    difficultsNumber.pop();
    difficultsString.pop();
    selectContents.remove(contents.length);
}

function clearContents():void {
    result.innerHTML = "<h2>Resultado:</h2>";
    contents = [];
    difficultsNumber = [];
    difficultsString = [];
    selectContents.innerHTML = "";
}

function fSubmit():void {
    result.innerHTML = "<h2>Resultado:</h2>";
    const inputHours:HTMLInputElement = window.document.getElementById("inputHours") as HTMLInputElement;
    if (verifyInputHours(inputHours)) {
        if (verifyContents()) {
            const valueTotalDifficultsNumber:number = sumDifficultsNumber();

            const hoursPerDay:number = Number(inputHours.value);
            const hoursPerWeek:number = hoursPerDay * 7;

            const hoursPerCycle:number = hoursPerWeek / valueTotalDifficultsNumber;

            const resultList:HTMLUListElement = generateHtmlResult(contents, hoursPerCycle, difficultsNumber, difficultsString);

            result.appendChild(resultList);
        } else {
            window.alert("Não foi adicionada matérias à lista");
        }
    } else {
        window.alert("Quantidade de horas diárias inválida!");
        inputHours.value = "";
    }
}

function verifyInputContent(inputContent:HTMLInputElement):boolean {
    return !!(inputContent.value.length);
}

function verifyInputHours(inputHours:HTMLInputElement):boolean {
    return !!(inputHours.value.length && Number(inputHours.value) >= 1 && Number(inputHours.value) <= 12);
}

function verifyContents():boolean {
    return !!(contents.length);
}

function sumDifficultsNumber():number {
    let sum:number = 0;
    for (let i:number = 0; i <= difficultsNumber.length - 1; i++) {
        sum += difficultsNumber[i];
    }
    return sum;
}

function generateHtmlResult(contents:string[], hoursPerCycle: number, difficultsNumber:number[], difficultsString:string[]):HTMLUListElement {
    const resultList:HTMLUListElement = document.createElement('ul');

    let resultListContent:string = '';
    for (let i = 0; i <= contents.length - 1; i++) {
        let hoursPerContent = hoursPerCycle * difficultsNumber[i];
        resultListContent += `<li><span class="${colorsDifficult(difficultsString[i])}">${contents[i]}</span> - ${hoursPerContent.toFixed().replace(/\.?0+$/, "")} horas por ciclo.</li>`;
    }

    resultList.innerHTML = resultListContent;
    return resultList;
}

function verifyContentAddedBefore(inputContent:HTMLInputElement):boolean {
    if (contents.indexOf(inputContent.value) !== -1) {
        window.alert("Este conteúdo já está na lista");
        return false;
    }
    return true;
}

function verifySelectOption(difficult1:HTMLOptionElement, difficult2:HTMLOptionElement, difficult3:HTMLOptionElement, difficult4:HTMLOptionElement, difficult5:HTMLOptionElement):boolean {
    return (difficult1.selected || difficult2.selected || difficult3.selected || difficult4.selected || difficult5.selected);
}

function returnSelectOption(difficult1:HTMLOptionElement, difficult2:HTMLOptionElement, difficult3:HTMLOptionElement, difficult4:HTMLOptionElement, difficult5:HTMLOptionElement):[number, string] {
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

function colorsDifficult(difficultString:string):string {
    switch (difficultString) {
        case "Ótimo":
            return "blue";
        case "Bom":
            return "green";
        case "Razoável":
            return "yellow";
        case "Ruim":
            return "orange";
        case "Péssimo":
            return "red";
        default:
            return "black";
    }
}