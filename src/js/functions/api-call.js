import axios from 'axios';
const _ = require('lodash')

// link api 
const apiLink = 'https://api.teleport.org/api/cities/?search='
const api = 'https://api.teleport.org/api/'

export const getData = (city) => {
    const request =  axios.get(apiLink+city)
    return request
}

