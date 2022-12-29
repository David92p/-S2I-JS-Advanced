import '../css/style.css'
import love from '../img/love.png'

import { createIcon } from '../img/icon';
import { casualCity } from './functions/api-call';
import { inputCreateList, createCanvaCity} from './functions/document'

const input = document.getElementById('input');
const btnSearch = document.querySelector('.btn-search');

const textFooter = document.querySelector('.my-text-footer')
const loveIcon = createIcon(love)
textFooter.appendChild(loveIcon)

input.addEventListener('focus', () => {
    input.setAttribute("placeholder", "");
})
input.addEventListener("focusout", () => {
    input.setAttribute("placeholder", "enter your city");
})
// inputCreateList()
input.addEventListener("keyup", inputCreateList);

// Listeners input da parte dell'utente
btnSearch.addEventListener('click', () => {
    createCanvaCity(input.value)
});
document.addEventListener('keypress', (e) => {
    if (e.code == "Enter"){
        createCanvaCity(input.value)
    }
});

// Listeners pagina
window.addEventListener('load', () => {
    createCanvaCity(casualCity)
});



