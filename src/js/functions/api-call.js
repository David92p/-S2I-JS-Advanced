import axios from 'axios';
// import Chart from 'chart.js/auto'; //lib utile per grafico di dati della
const _ = require('lodash')
import cities from '../../json/citylist.json'

// const 
export const countriesNames = []
// cicliamo il Json per avere una lista di nome delle città
Object.keys(cities).forEach(city => {
    countriesNames.push(city)
});

// città generata casualmente dalla lista countriesNames
export const casualCity = countriesNames[Math.floor(Math.random() * 265)]

// link api
//const api = 'https://api.teleport.org/api/cities/?search=';
// environment variables
const API_KEY = process.env.API_KEY;

// chiamata Api tramite valore di input
export const getDataCity = async (city) => {
    const request = await axios.get(API_KEY+city)
    return request
};

// chiamata Api tramite valore casuale creato nello script
export const getCasualCity = async () => {
    const citiesName = await getDataCity(casualCity);
    return citiesName
};


