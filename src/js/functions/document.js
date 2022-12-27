import { Chart } from 'chart.js/auto'

// import async functions
import { dataCollection } from "./async"
// import const lista città
import { countriesNames } from './api-call';

// La funzione estrapola una lista di città dalla lista "countriesNames" in base al valore inserito dall'utente
const createListCities = (value) => {
    // convertiamo il valore inserito in valore minuscolo con lettera iniziale maiuscola
    const valueUser = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    // lista di città selezionabili 
    const citiesSelected = []
    // ciclo sulla lunghezza del valore inserito
    for (let i=0; i<valueUser.length; i++){
        countriesNames.forEach(city => {
            // condizione sul carattere selezionato dall'indice && controllo se elemento è già presente
            if (city[i] != valueUser[i] && citiesSelected.includes(city)){
                // eliminiamo la city dalla lista selezionabile 
                citiesSelected.splice(citiesSelected.indexOf(city), 1)
            }
            // condizione sul carattere selezionato dall'indice && controllo se elemento NON è già presente
            else if (city[i] == valueUser[i] && !citiesSelected.includes(city)){
                // inseriamo la city all'interno della lista selezionabile
                citiesSelected.push(city)
                let index = 0
                // controllo se ogni carattere dell'elemento inserito rispetta i caratteri del valore utente
                while (index < valueUser.length){
                    // condizione in caso di carattere diverso
                    if (city[index] != valueUser[index]){
                        // eliminiamo la city dalla lista selezionabile - indiciziamo a 0 - interrompiamo il ciclo
                        citiesSelected.splice(citiesSelected.indexOf(city), 1)
                        index = 0
                        break
                    }
                    // incremento indice in caso di carattere uguale
                    index += 1
                }     
            }
        })
    }
    return citiesSelected.slice(0,5)
};


// La funzione effettua una chiamata all'api tramite un valore inserito dall'utente
// La funzione manipola il dom creando gli <li></li> necessari in base al numero dei dati ricevuti dalla api fino ad un massimo di 5 elementi
export const inputCreateList = () => {
    const listCity = createListCities(input.value)
    removeElements()
    for (let city of listCity){
        // condizione per la creazione dei vari <li>
        if(input.value != ""){
        // creazione <li>
        let listItem = document.createElement('li');
        // inseriamo style ed eventi click all'interno del <li> creato 
        listItem.classList.add("list-items");
        listItem.style.cursor ="pointer";
        listItem.addEventListener("click", () => displayNames(city));
        // inserimento valore input dentro <li> elemento
        let word = "<b>" + city.substr(0, input.value.length) + "</b>";
        word += city.substr(input.value.length);
        listItem.innerHTML = word;
        document.querySelector(".list").appendChild(listItem);
        }
    }
};

//funzione elimina <li> da container <ul>
export const removeElements = () => {
    const items = document.querySelectorAll('.list-items');
    items.forEach(el => el.remove())
};

// funzione stampa valore su display input
const displayNames = (value) => {
    input.value = value
    removeElements()
};

// Funzione di creazione e completamento main-page-section attraverso i dati ricevuti dall'api
export const createCanvaCity = async (value) => {
    try {
        // richiesta dati
        let objDataCity = await dataCollection(value);
        // inseriamo la foto della città come sfondo dell'intestazione
        const imgHeader = document.querySelector('.container-research')
        imgHeader.style.backgroundImage = `url(${objDataCity.imgCity})`
        // inseriamo i dati relativi alla descrizione della città
        const containerDescription = document.querySelector('.container-descriptions-city')
        // rimozione contenuto precedente sè presente
        containerDescription.querySelectorAll('div').forEach(el => el.remove())
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('title-container')
        // inseriamo l'intestazione della città con titolo e sottotitolo
        let title = `<h1>${objDataCity.name}</h1><h3>Continent: ${objDataCity.continent}</h3>`
        // inseriamo il sindaco se il dato è presente
        if (objDataCity.mayor != undefined){
                title += `<p>The name of the city mayor is <b>${objDataCity.mayor}</b></p>`
            }
        titleContainer.innerHTML = title
        containerDescription.append(titleContainer)
        // sezione con breve testo della città selezionata
        const summaryContainer = document.createElement('div')
        summaryContainer.classList.add('summary-container')
        // inseriamo il valore di summary già fornito in html
        summaryContainer.innerHTML = objDataCity.summary
        containerDescription.append(summaryContainer)
        // container total-score
        const containerTotalScore = document.querySelector('.container-total-score')
        // azzeriamo se questo è già presente
        sectionCleaning(containerTotalScore)
        const parTotalScore = document.createElement('p')
        const totalScore = document.createElement('div')
        parTotalScore.innerText = 'Total Score: '
        // arrotondiamo il valore del total score tramite funzioni Built-in 
        totalScore.innerText = Math.round(objDataCity.finalScore)
        containerTotalScore.append(parTotalScore)
        containerTotalScore.append(totalScore)
        // contenitore grafico dei dati richiesti
        const containerCanva = document.querySelector('.container-canva')
        // resettiamo il contenuto
        sectionCleaning(containerCanva)
        // dati richiesti
        const canvas = document.createElement('canvas')
        canvas.classList.add('my-canva')
        // richiamiamo la funzione per creare un grafico 
        createCanvaScore(canvas, objDataCity)
        containerCanva.append(canvas)

        // btn per gestire grafico
        const btnScores = document.querySelector('.btn-scores');
        const btnSalaries = document.querySelector('.btn-salaries');

        btnScores.addEventListener('click', () => {
            sectionCleaning(containerCanva)
            const canvas = document.createElement('canvas')
            canvas.classList.add('my-canva')
            createCanvaScore(canvas, objDataCity)
            containerCanva.append(canvas)
        })

        btnSalaries.addEventListener('click', () => {
            sectionCleaning(containerCanva)
            const canvas = document.createElement('canvas')
            canvas.classList.add('my-canva')
            createCanvasSalaries(canvas, objDataCity)
            containerCanva.append(canvas)
        })
    }
    catch {
        if(input.value != ""){
            removeElements()
            input.value = ""
            const message = document.querySelector('.danger')
            message.innerText = "Wrong Value"
            message.style.display = 'block'
        }
        else if (!countriesNames.includes(value)) {
            removeElements()
            input.value = ""
            const message = document.querySelector('.danger')
            message.innerText = "Enter a city in the search box"
            message.style.display = 'block'
        }
        
        setTimeout(() => {
            const message = document.querySelector('.danger')
            message.style.display = 'none'
        },3000)
    }
};

// funzione creazione grafico score
const createCanvaScore = async (canvas, objData) => {
    const colors = []
    const names = []
    const scores = []
    objData.scores.forEach(el => {
        colors.push(el.color)
        names.push(el.name)
        scores.push(Math.round(el.score_out_of_10))
    })
    // dati canvas contenitore
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: "Score",
                data: scores, 
                backgroundColor: colors,
                borderWidth: 1,
                borderColor: 'black',
                hoverBorderWidth: 3,
                hoverBorderColor: 'grey'
            }]
        }
    })
};

// funzione creazione grafico salari
const createCanvasSalaries = (canvas, objData) => {
    //const colors = []
    const names = []
    const salaries = []
    objData.salaries.forEach(el => {
        names.push(el.job.title)
        salaries.push(Math.round(el.salary_percentiles.percentile_50))
    })
    // dati canvas contenitore
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: names,
            datasets: [{
                label: "Salaries",
                data: salaries, 
                pointBackgroundColor: '#552e5a',
                pointBorderColor:  '#552e5a',
                pointStyle: 'star',
                borderColor: getNewColor(),
                borderWidth: "2",
                pointHoverBorderWidth: '5'
            }]
        }
    })
}

// funzione di pulizia container canva
const sectionCleaning = (containerCanva) => {
    while (containerCanva.firstChild) {
        containerCanva.removeChild(containerCanva.firstChild);
    }
}

// funzione di creazione colore css in modo casuale
const getNewColor = () => {
    let symbols = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++){
        color = color + symbols[Math.floor(Math.random() * 16)]
    }
    return color
}

