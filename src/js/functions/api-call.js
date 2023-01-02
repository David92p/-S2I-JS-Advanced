import axios from 'axios';

import cities from '../../json/citylist.json'


export const countriesNames = []
// cicliamo il Json per avere una lista di nome delle città
Object.keys(cities).forEach(city => {
    countriesNames.push(city)
});

// città generata casualmente dalla lista countriesNames
export const casualCity = countriesNames[Math.floor(Math.random() * 265)]

// chiamata Api tramite valore di input
export const getDataCity = async (city) => {
    // environment variables
    const API_KEY = process.env.API_KEY;
    const request = await axios.get(API_KEY+city)
    return request
};

// async function callLambdaFunction() {
//     // qui la magia: facciamo una chiamata ad una funzione che creeremo fra poco in un file a parte e che Netlify chiama dal proprio back-end in modo sicuro e privato quando necessario
//     const response = await fetch("/.netlify/functions/lambda");
//     const data = await response.json();
  
//     console.log(response); // Facciamo ciò che vogliamo coi dati ottenuti
//   }
  
// callLambdaFunction();




