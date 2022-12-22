import axios from 'axios';
import { Chart } from 'chart.js/auto'
// import response from api
import { getCasualCity } from "./api-call";
// import async functions
import { dataCollection } from "./async"
// import const lista città
import { countriesNames, casualCity } from './api-call';



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

export const createCanvaCity = async (value) => {
    try {
        let objDataCity = await dataCollection(value);
        // inseriamo la foto della città come sfondo dell'intestazione
        const imgHeader = document.querySelector('.container-research')
        imgHeader.style.backgroundImage = `url(${objDataCity.imgCity})`
        // inseriamo i dati relativi alla descrizione della città
        const containerDescription = document.querySelector('.container-descriptions-city')
        containerDescription.querySelectorAll('div').forEach(el => el.remove())
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('title-container')
        let title = `<h1>${objDataCity.name}</h1><h3>Continent: ${objDataCity.continent}</h3>`
        if (objDataCity.mayor != undefined){
                title += `<p>The name of the city mayor is <b>${objDataCity.mayor}</b></p>`
            }
        titleContainer.innerHTML = title
        containerDescription.append(titleContainer)
        const summaryContainer = document.createElement('div')
        summaryContainer.classList.add('summary-container')
        summaryContainer.innerHTML = objDataCity.summary
        containerDescription.append(summaryContainer)
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

// export const createCanvaScore = async (canvas) => {
//     let objDataCity = await dataCollection(casualCity)
//     console.log(objDataCity.scores);
//     const colors = []
//     const names = []
//     const scores = []
//     objDataCity.scores.forEach(el => {
//         colors.push(el.color)
//         names.push(el.name)
//         scores.push(Math.round(el.score_out_of_10))
//     })
//     // inseriamo la foto della città come sfondo dell'intestazione
//     const imgHeader = document.querySelector('.container-research')
//     imgHeader.style.backgroundImage = `url(${objDataCity.imgCity})` 
    
//     // dati canvas contenitore
//     new Chart(elementCanva, {
//         type: 'bar',
//         data: {
//             labels: names,
//             datasets: [{
//                 label: "Score",
//                 data: scores, 
//                 backgroundColor: colors,
//                 borderWidth: 1,
//                 borderColor: 'black',
//                 hoverBorderWidth: 3,
//                 hoverBorderColor: 'grey'
//             }]
//         },
//         options: {
//             title: {
//                 display: true,
//                 text: 'Life Quality',
//                 fontSize: 25
//             },
//             legend: {
//                 display: true,
//                 position: 'left'
//             }
//         }
//     })
// };

// export const createCanvaScoreByUser = async (elementCanva) => {
//     console.log('in ascolto');
// };

