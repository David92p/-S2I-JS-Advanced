import axios from 'axios';
const _ = require('lodash')

//link api
const api = 'https://api.teleport.org/api/'
// link api con valore input
const apiLink = 'https://api.teleport.org/api/cities/?search='

//chiamata Api tramite valore di input
export const getData = (city) => {
    const request =  axios.get(apiLink+city)
    return request
}


