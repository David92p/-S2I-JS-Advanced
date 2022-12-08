import '../css/style.css'

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


