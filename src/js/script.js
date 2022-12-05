import '../css/style.css'
import { getDataCity } from './functions/api-call';

import cities from '../json/citylist.json'

import { inputCreateList , btnValueCLick, casualImgCity} from './functions/document'

const input = document.getElementById('input');
const btn = document.querySelector('.btn');


// inputCreateList()
input.addEventListener("keyup", inputCreateList);

// Listener input da parte dell'utente
btn.addEventListener('click', btnValueCLick);
document.addEventListener('keypress', (e) => {
    if (e.code == "Enter"){
        btnValueCLick()
    }
});

// funzione di caricamento img casuale sfondo header
casualImgCity()

const countriesNames = []
Object.values(cities).forEach(city => {
    countriesNames.push(city)
});

const cityProva = ['arezzo', 'aringa', 'aereo', 'bidone', 'bidello', 'posata', 'posate', 'posate', 'posate']

const cercaCitta = (value) => {
    const valueUser = value.toLowerCase()
    const citiesSelected = []
    
    for (let i=0; i<valueUser.length; i++){
        cityProva.forEach(city => {
            if (city[i] != valueUser[i] && citiesSelected.includes(city)){
                
            }
            // if (city[i] == valueUser[i] && !citiesSelected.includes(city)){
            //     console.log(city);
            // }
            // if (!citiesSelected.includes(city)){
            //     if (valueUser[i] == city[i]){
            //         console.log(city);
            //         //citiesSelected.push(city)
            //     }
            // }
        })
    }
    // countriesNames.forEach(city => {
    //     if (value[i] == city[i]){
    //         citiesSelected.push(city)
    //     } 
    // })
    //console.log(citiesSelected);
}

//cercaCitta('p')

cercaCitta('ar');



