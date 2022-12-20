import '../css/style.css'

import { inputCreateList, createCanvaCity} from './functions/document'

const input = document.getElementById('input');
const btnSearch = document.querySelector('.btn-search');
const btnScores = document.querySelector('.btn-scores');
const btnDetails = document.querySelector('.btn-details');
const btnSalaries = document.querySelector('.btn-salaries')
const myCanva = document.querySelector("#my-canva").getContext('2d')

// inputCreateList()
input.addEventListener("keyup", inputCreateList);

// Listeners input da parte dell'utente
btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    createCanvaCity(input.value)
});
// document.addEventListener('keypress', (e) => {
//     if (e.code == "Enter"){
//         createCanvaScoreByUser()
//     }
// });
btnScores.addEventListener('click', () => {
    console.log('scores avviato');
})
btnDetails.addEventListener('click', () => {
    console.log('details avviato');
})
btnSalaries.addEventListener('click', () => {
    console.log('salaries avviato');
})

// Listeners pagina
// window.addEventListener('load', () => {
//     createRandomCanvaScore(myCanva)
// });



