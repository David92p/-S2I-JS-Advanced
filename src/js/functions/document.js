import { getDataCity, getCasualCity} from "./api-call"
import axios from 'axios';

// La funzione effettua una chiamata all'api tramite un valore inserito dall'utente
// La funzione manipola il dom creando gli <li></li> necessari in base al numero dei dati ricevuti dalla api fino ad un massimo di 5 elementi
export const inputCreateList = () => {
    // richiesta dati api tramite valore campo input
    getDataCity(input.value)
    // gestione dati e inserimento nome citta all'interno di un []
    .then(response => {
        const data = response.data
        const cityData = data._embedded["city:search-results"]
        const listCity = []
        cityData.forEach(element => {
            listCity.push(element.matching_full_name)
        });
        return listCity.slice(0,5);
    })
    // gestione dati e inserimento valore tramite click
    .then(listCity => {
        // puliamo inzialemente la lista <ul> da possibili <li> creati in precedenza 
        removeElements();
        // cicliamo le possibili città della lista composta dalla funzione async getData
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
    })
} 

//funzione elimina <li> da container <ul>
const removeElements = () => {
    const items = document.querySelectorAll('.list-items');
    items.forEach(el => el.remove())
}

// funzione stampa valore su display input
const displayNames = (value) => {
    input.value = value
    removeElements()
}

// event listener btn e chiamata api per valore inserito
export const btnValueCLick = () => {
    let items = document.querySelectorAll('.list-items')
    if(items.length == 0 && input.value != ""){
        getDataCity(input.value).then(res => {
            input.value = ""
            let data = res.data
            console.log(data);
        })
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

// La funzione effettua una chiamata Api tramite un valore inserito casualmente da Js 
// Api restituisce i dati necessari al dom per la creazione di una card 
// Dati inseriti nel seguente modo [titolo città - foto città - testo introduttivo città]
// export const createCard = () => {
//     getCasualCity()
//     // gestione promise con risultato array
//     .then(response => {
//         const request = axios.get(response.data._embedded["city:search-results"][0]._links['city:item'].href)
//         return request
//     })
//     .then(response => {
//         // link api data city
//         const linkData = response.data._links["city:urban_area"].href
//         // request data api
//         const data = axios.get(linkData)
//         return data
//     })
//     .then(response => {
//         // lista dati card 
//         const dataRequest = []
//         const dataCity = response.data
//         // nome città
//         dataRequest.push(dataCity.full_name)
//         // richiesta dati img 
//         const requestPhoto = axios.get(dataCity._links["ua:images"].href)
//         requestPhoto.then(response => {
//             // push img [] dati card 
//             dataRequest.push(response.data.photos[0].image.web)
//             // richeista dati desdescrizione 
//             const requestDescription = axios.get(dataCity._links["ua:scores"].href)
//             requestDescription.then(response => {
//                 // push descrizione [] dati card 
//                 dataRequest.push(response.data.summary)
//                 return dataRequest
//             }).then(dataRequest => {
//                 const imgCard = document.querySelector('.container-research')
//                 const titleCard = document.querySelector('h2')
//                 const descriptionCard = document.querySelector('p')
//                 imgCard.style.backgroundImage = `url(${dataRequest[1]})` 
//                 // titleCard.textContent = dataRequest[0]
//                 //descriptionCard.textContent = dataRequest[2]
//             })  
//         })
//     })
// };
