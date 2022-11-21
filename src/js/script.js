import '../css/style.css'

import { inputCreateList , btnValueCLick } from './functions/document'
import { getDataCountry } from './functions/api-call';

const input = document.getElementById('input');
const btn = document.querySelector('.btn');


//inputCreateList()
input.addEventListener("keyup", inputCreateList);

//Listener input entered by the user
btn.addEventListener('click', btnValueCLick);
document.addEventListener('keypress', (e) => {
    if (e.code == "Enter"){
        btnValueCLick()
    }
});

getDataCountry()





