import axios from 'axios';

import { getDataCity } from "./api-call"
import { countriesNames } from './api-call';

// la funzione restituisce un obj con i dati utili della città selezionata nella lista prodotta 
export const dataCollection = async (value) => {
    try {
        if(countriesNames.includes(value)){
            // richiesta e attesa dati da parte dell'api
            const requestAPI = await getDataCity(value)
            input.value = ""
            // controllo response status
            if (requestAPI.status != 200 || requestAPI.request.readyState != 4){
                // Inserire codice per ricerca città fallita
                return 'risultato non trovato'
            }
            else {
                // link api per analisi città inserita 
                const linkCity = requestAPI.data._embedded["city:search-results"][0]._links["city:item"].href
                // richiesta dati
                const requestData = await axios.get(linkCity)
                // link api ricerca caratteristiche città
                const linkUrbanData = requestData.data._links["city:urban_area"].href
                // richiesta dati
                const requestPrincipal = await axios.get(linkUrbanData)
                // obj contenente i dati finali da mettere a grafico
                const dataFinal = {}
                // dati iniziali inseriti {nome, continente, sindaco}
                dataFinal.name = requestPrincipal.data.full_name
                dataFinal.continent = requestPrincipal.data.continent
                dataFinal.mayor = requestPrincipal.data.mayor
                // link api per foto città
                const linkImgCity = requestPrincipal.data._links["ua:images"].href
                // richiesta dati
                const requestImgCity = await axios.get(linkImgCity)
                // inseriamo la foto della città all'interno del obj finale 
                dataFinal.imgCity = requestImgCity.data.photos[0].image.web
                // link api lavoro e salario
                const linkSalaries = requestPrincipal.data._links["ua:salaries"].href
                // richiesta dati 
                const requestSalaries =  await axios.get(linkSalaries)
                // inseriamo i dati richiesti nel nostro obj finale
                dataFinal.salaries = requestSalaries.data["salaries"]
                // link score finale
                const linkFinalScore = requestPrincipal.data._links["ua:scores"].href
                // richiesta dati
                const requestFinalScore = await axios.get(linkFinalScore)
                // inseriamo i dati all'interno del nostro obj finale nel seguente ordine "categoria con singolo punteggio - breve descrizione - punteggio totale"
                dataFinal.scores = requestFinalScore.data["categories"]
                dataFinal.summary = requestFinalScore.data["summary"]
                dataFinal.finalScore = requestFinalScore.data["teleport_city_score"]
    
                return dataFinal
            }
        }
    }
    catch {
        const message = document.querySelector('.danger')
        message.innerText = "City data not yet available"
        message.style.display = 'block'
    }
};

