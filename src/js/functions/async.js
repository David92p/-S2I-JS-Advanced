import axios from 'axios';
import { removeElements } from "./document"
import { getDataCity, getCasualCity } from "./api-call"
import { countriesNames } from './api-call';

// la funzione restituisce un obj con i dati utili della città selezionata nella lista prodotta 
export const dataCollection = async (value) => {
    // variabile contentente la lista delle città
    // let items = document.querySelectorAll('.list-items')
    // controllo del box text prima di iniziare l'analisi del valore inserito
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
            // link api per dettagli città (lavoro, clima, sanità ecc)
            const linkDetailsCity = requestPrincipal.data._links["ua:details"].href
            // richiesta dati
            const requestDetailsCity = await axios.get(linkDetailsCity)
            // inseriamo i dati dei dettagli della città all'interno del obj finale 
            dataFinal.detailsCity = requestDetailsCity.data["categories"]
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

            // DA INSERIRE CODICE PER CHIAVE CITTA' SUBURBANE DA requestPrincipal.data //
            console.log(dataFinal);
            return dataFinal
        }
    }
    else {
        if(input.value.length == 0){
            alert('INSERIRE UNA CITTA') // alert provvisorio
        }
        else{
            removeElements()
            input.value = ""
            alert('valore errato') // alert provvisorio
            // return 'INSERIRE CODICE IN CASO DI INPUT NON VALIDO'
        }
        
    }
};


