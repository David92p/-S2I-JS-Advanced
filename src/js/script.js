import '../css/style.css'

import { inputCreateList, createRandomCanvaScore, createCanvaScoreByUser} from './functions/document'

const input = document.getElementById('input');
const btn = document.querySelector('.btn');
const myCanva = document.querySelector("#my-canva").getContext('2d')

// inputCreateList()
input.addEventListener("keyup", inputCreateList);

// Listeners input da parte dell'utente
btn.addEventListener('click', (e) => {
    e.preventDefault()
    createCanvaScoreByUser(myCanva)
});
document.addEventListener('keypress', (e) => {
    if (e.code == "Enter"){
        createCanvaScoreByUser()
    }
});

// Listeners pagina
window.addEventListener('load', () => {
    createRandomCanvaScore(myCanva)
});



