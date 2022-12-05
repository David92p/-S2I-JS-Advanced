import axios from 'axios';
// import Chart from 'chart.js/auto'; //lib utile per grafico di dati della
const _ = require('lodash')

import cities from '../../json/citylist.json'

// cicliamo il Json per avere una lista di nome delle città
const countriesNames = []
Object.keys(cities).forEach(city => {
    countriesNames.push(city)
});

// città generata casualmente dalla lista countriesNames
const casualCity = countriesNames[Math.floor(Math.random() * 265)]

// link api
// const api = 'https://api.teleport.org/api/';

const API_KEY = process.env.API_KEY;

// link api country
//const apiLinkCountry = 'https://api.teleport.org/api/countries/';


// chiamata Api tramite valore di input
export const getDataCity = (city) => {
    const request = axios.get(API_KEY+city)
    return request
};

// chiamata Api tramite valore casuale creato nello script
export const getCasualCity = () => {
    const citiesName = getDataCity(casualCity);
    return citiesName
    // citiesName.then(response => {
    //     const request = axios.get(response.data._embedded["city:search-results"][0]._links['city:item'].href)
    //     return request
    // })
    // gestione promise con risultato array
    // citiesName.then(response => {
    //     // request data api
    //     const request = axios.get(response.data._embedded["city:search-results"][0]._links['city:item'].href)
    //     request.then(response => {
    //         // link api data city
    //         const linkData = response.data._links["city:urban_area"].href
    //         // request data api
    //         const data = axios.get(linkData)
    //         return data
    //     })
    // })
};


// data2.then(response => {
            //     const dataCity = response.data
            //     const requestPhoto = axios.get(dataCity._links["ua:images"].href)
            //     const requestDescription = axios.get(dataCity._links["ua:scores"].href)
            //     const dataRequest = [
            //         dataCity.full_nam, 
            //         requestPhoto,
            //         requestDescription
            //     ]
            //     dataRequest.push(dataCity.full_name)
            //     dataRequest.push
            //     const requestPhoto = axios.get(dataCity._links["ua:images"].href)
            //     const requestDescription = axios.get(dataCity._links["ua:scores"].href)
            //     requestPhoto.then(response => {
            //         dataRequest.push(response.data.photos[0].image.web)
            //         //console.log(dataRequest);
            //     })
            //     requestDescription.then(response => {
            //         dataRequest.push(response.data.summary)
            //     })
            //     console.log(dataRequest);;
            // })
            // data2.then(response => {
            //     // array dati card homepage [nome città - foto - descrizione]
            //     const dataRequest = []
            //     const dataCity = response.data
            //     const nameCity = dataCity.full_name
            //     dataRequest.push(nameCity)
            //     const requestPhoto = axios.get(dataCity._links["ua:images"].href)
            //     requestPhoto.then(response => {
            //         dataRequest.push(response.data.photos[0].image.web)
            //         return dataCity
            //     }).then(response => {
            //         const requestDescription = axios.get(dataCity._links["ua:scores"].href)
            //         requestDescription.then(response => {
            //             dataRequest.push(response.data.summary)
            //             console.log(dataRequest);
            //         })
            //     })
            // })