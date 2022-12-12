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
            // condizione in caso di ricerca città fallita
            if (res.status != 200 && res.request.readyState != 4){
                // Inserire codice per ricerca città fallita
                console.log('risultato non trovato');
            }
            else {
                // link api città ricercata dall'utente
                const apiCity = res.data._embedded["city:search-results"][0]._links["city:item"].href
                // richiesta dati
                const request = axios.get(apiCity)
                // gestione dati restituiti dall'api
                request.then(res => {
                    // Inserire codice per ricerca città fallita
                    if (res.status != 200 && res.request.readyState != 4){
                        console.log('risultato non trovato');
                    }
                    else {
                        // link api ricerca caratteristiche città
                        const linkUrbanCityArea = res.data._links["city:urban_area"].href
                        // richiesta dati
                        const request = axios.get(linkUrbanCityArea)
                        request.then(res => {
                            // Condizione request fallita
                            if (res.status != 200 && res.request.readyState != 4){
                                console.log('risultato non trovato');
                            }
                            else {
                                // obj contenente i dati finali da mettere a grafico
                                const dataFinal = {}
                                // dati iniziali inseriti {nome, continente, sindaco}
                                dataFinal.name = res.data.full_name
                                dataFinal.continent = res.data.continent
                                dataFinal.mayor = res.data.mayor
                                // obj di partenza dove effettuare le richieste ai link api
                                const linkInitial = res.data._links
                                // link api per dettagli città (lavoro, clima, sanità ecc)
                                const detailsCity = linkInitial["ua:details"].href
                                // richiesta dati dettagli città
                                const requestDetailCity = axios.get(detailsCity)
                                .then(res => {
                                    // condizione in caso di ricerca città fallita
                                    if (res.status != 200 && res.request.readyState != 4){
                                        // Inserire codice per ricerca città fallita
                                        console.log('risultato non trovato');
                                    }
                                    else {
                                        // inseriamo i dati dei dettagli della città all'interno del obj finale 
                                        dataFinal.detailsCity = res.data["categories"]
                                        // link api per foto città
                                        const imgCity = linkInitial["ua:images"].href
                                        // richiesta dati foto città
                                        const requestImgCity = axios.get(imgCity)
                                        .then(res => {
                                            // condizione in caso di ricerca città fallita
                                            if (res.status != 200 && res.request.readyState != 4){
                                                // Inserire codice per ricerca città fallita
                                                console.log('risultato non trovato');
                                            }
                                            else {
                                                // inseriamo la foto della città all'interno del obj finale 
                                                dataFinal.imgCity = res.data.photos[0].image.web
                                                // link api città suburbana
                                                const generalCities = linkInitial["ua:cities"].href
                                                // richiesta dati 
                                                const requestGeneralCities = axios.get(generalCities)
                                                .then(res => {
                                                // condizione in caso di ricerca città fallita
                                                    if (res.status != 200 && res.request.readyState != 4){
                                                        // Inserire codice per ricerca città fallita
                                                        console.log('risultato non trovato');
                                                    }
                                                    else {
                                                        // lista dati città suburbane
                                                        const listCities = res.data._links["city:items"]
                                                        const requestsSuburbanCities = []
                                                        // cicliamo la lista effettuando una richiesta async ad ogni città suburbana
                                                        listCities.forEach(city => {
                                                            const suburbanCity = axios.get(city.href)
                                                            suburbanCity.then(res => {
                                                                requestsSuburbanCities.push(res.data)
                                                            })
                                                        }) 
                                                        dataFinal.suburbansCities = requestsSuburbanCities
                                                        //const salaries = linkInitial["ua:salaries"].href
                                                        console.log(dataFinal);
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                                
                                // const detailsCity = res.data._links["ua:details"].href
                                // const imgCity = res.data._links["ua:images"].href
                                // const primaryCities = res.data._links["ua:primary-cities"]
                                
                            }
                        })
                    }
                })
            } 
        // else {
        //     const apiCity = data._embedded["city:search-results"][0]._links["city:item"].href
        //     const request = axios.get(apiCity)
        //     request.then(response => {
        //         const dataFinal = []
        //         const name = response.data.name
        //         const population = response.data.population
        //         dataFinal.push({nameCity: name})
        //         dataFinal.push({population: population})
        //         console.log(response.data);
        //         console.log(response);
        //         for (let key of Object.keys(response.data._links)){
        //             if (key == "city:urban_area"){
        //                 const cityUrbanAreaApi = response.data._links["city:urban_area"].href
        //                 const request = axios.get(cityUrbanAreaApi)
        //                 console.log(cityUrbanAreaApi);
        //             }
        //         }
        //         // request2.then(response => {
        //         //     console.log(response.data);
        //         // })
        //     })
        // }
    })
    }
    // else {
    //     // eccezione
    // }
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

