import { getDataCity } from "./api-call"


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
            let data = res.data
            console.log(data);
        })
    }
};
