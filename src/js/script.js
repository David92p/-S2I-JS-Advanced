import '../css/style.css'

import { inputCreateList, casualImgCity, createCanva} from './functions/document'

const input = document.getElementById('input');
const btn = document.querySelector('.btn');

// inputCreateList()
input.addEventListener("keyup", inputCreateList);

// Listener input da parte dell'utente
btn.addEventListener('click', createCanva);
document.addEventListener('keypress', (e) => {
    if (e.code == "Enter"){
        createCanva()
    }
});

// funzione di caricamento img casuale sfondo header
casualImgCity()

// createCanva()