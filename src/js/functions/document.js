import axios from 'axios';
// import async function 
import { getCasualCity, getDataCity } from "./api-call";
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

// event listener btn e chiamata api per valore inserito
export const btnValueCLick = () => {
    let items = document.querySelectorAll('.list-items')
    if(items.length == 0 && input.value != ""){
        getDataCity(input.value)
        .then(res => {
        input.value = ""
        const data = res.data
        if (data.count == 0){
            // Inserire codice per ricerca città fallita
            console.log('risultato non trovato');
        } 
        else {
            const apiCity = data._embedded["city:search-results"][0]._links["city:item"].href
            const request = axios.get(apiCity)
            request.then(response => {
                const dataFinal = []
                const name = response.data.name
                const population = response.data.population
                dataFinal.push({nameCity: name})
                dataFinal.push({population: population})
                console.log(response.data);
                console.log(response);
                for (let key of Object.keys(response.data._links)){
                    if (key == "city:urban_area"){
                        const cityUrbanAreaApi = response.data._links["city:urban_area"].href
                        const request = axios.get(cityUrbanAreaApi)
                        console.log(cityUrbanAreaApi);
                    }
                }
                // request2.then(response => {
                //     console.log(response.data);
                // })
            })
        }
    })
    }
    else {
        // eccezione
    }
};

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

