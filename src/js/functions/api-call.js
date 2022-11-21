import axios from 'axios';
const _ = require('lodash')

// link api
const api = 'https://api.teleport.org/api/';
// link api con valore input
const apiLinkCity = 'https://api.teleport.org/api/cities/?search=';
// link api country
const apiLinkCountry = 'https://api.teleport.org/api/countries/';

//chiamata Api tramite valore di input
export const getDataCity = (city) => {
    const request = axios.get(apiLinkCity+city)
    return request
};

export const getDataCountry = () => {
    const data = axios.get(apiLinkCountry)
    data.then(data => {
        if (data.request['readyState'] == 4){
            const countryData = data.data
            const countryDataList = countryData['_links']['country:items']
            return countryDataList  
        }
    }).then(countryDataList => {
        let linksCountry = []
        while (linksCountry.length < 5){
            let n = Math.floor(Math.random() * 253);
            if (!linksCountry.includes(countryDataList[n])){
                linksCountry.push(countryDataList[n].href)
            }
        };
        console.log(linksCountry);
        
    })
};




