import axios from 'axios';
import { Chart } from 'chart.js/auto'
// import response from api
import { getCasualCity } from "./api-call";
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
}


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
const removeElements = () => {
    const items = document.querySelectorAll('.list-items');
    items.forEach(el => el.remove())
};

// funzione stampa valore su display input
const displayNames = (value) => {
    input.value = value
    removeElements()
};

// funzione di ricerca img città casuale inserita come sfondo header
export const casualImgCity = () => {
    getCasualCity()
    .then(response => {
        const request = axios.get(response.data._embedded["city:search-results"][0]._links['city:item'].href)
        return request
    })
    .then(response => {
        const linkData = response.data._links["city:urban_area"].href
        const data = axios.get(linkData)
        return data
    })
    .then(response => {
        const linkData = response.data._links["ua:images"].href
        const data = axios.get(linkData)
        return data
    })
    .then(response => {
        const element = document.querySelector('.container-research')
        element.style.backgroundImage = `url(${response.data.photos[0].image.web})` 
    })
}

export async function createCanva(){
    console.log('primo');
    let x = await dataCollection()
    console.log('secondo');
    console.log(x);
    
    // const data = [
    //     { year: 2010, count: 10 },
    //     { year: 2011, count: 20 },
    //     { year: 2012, count: 15 },
    //     { year: 2013, count: 25 },
    //     { year: 2014, count: 22 },
    //     { year: 2015, count: 30 },
    //     { year: 2016, count: 28 },
    //   ];
    //   new Chart(
    //     document.getElementById('myCanva'),
    //     {
    //       type: 'bar',
    //       data: {
    //         labels: data.map(row => row.year),
    //         datasets: [
    //           {
    //             label: 'Acquisitions by year',
    //             data: data.map(row => row.count)
    //           }
    //         ]
    //       }
    //     }
    //   );
    // console.log(data2);
}
