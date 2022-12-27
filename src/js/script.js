import '../css/style.css'
import love from '../img/love.png'
import linkedin from '../img/linkedin.png'
import gitHub from '../img/git-hub.png'

import { createIcon } from '../img/icon';
import { casualCity } from './functions/api-call';
import { inputCreateList, createCanvaCity} from './functions/document'

const input = document.getElementById('input');
const btnSearch = document.querySelector('.btn-search');
const linkedinBtn = document.querySelector('.linkedin-btn');
const gitHubBtn = document.querySelector('.git-hub-btn');

linkedinBtn.appendChild(createIcon(linkedin))
gitHubBtn.appendChild(createIcon(gitHub))

const textFooter = document.querySelector('.my-text-footer')
const loveIcon = createIcon(love)
loveIcon.style.height = '15px'
loveIcon.style.width = '15px'
textFooter.appendChild(loveIcon)

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



