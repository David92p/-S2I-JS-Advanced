import '../css/style.css'
import {getData} from './functions/api-call'
import { loadData, citySelected} from './functions/document'

const inputContainer = document.querySelector('.input-container')
const countryInput = document.querySelector('.input')
const select = document.querySelector('.autocomplete-list')
const btn = document.querySelector('.btn')




countryInput.addEventListener('input', () => {
    getData(countryInput.value)
    .then(response => {
        const data = response.data
        const cityData = data._embedded["city:search-results"]
        const listCity = []
        cityData.forEach(element => {
            listCity.push(element.matching_full_name)
        });
        return listCity
    })
    .then(citySelectable => {
        loadData(citySelectable, inputContainer)
    })
})








// import '../css/style.css'
// const citylist = require('./json/citylist.json')

// let cities = [];

// for (let city of Object.values(citylist)){
//     cities.push(city)
//     cities.sort()
// }

// const inputContainer = document.querySelector('.input-container')
// //const citiesListElement = document.querySelector('.autocomplete-list')
// const cityInput = document.querySelector('.input')
// const btn = document.querySelector('.btn')

// // let select = document.createElement('select')
// //     select.classList.add('autocomplete-list')
// //     inputContainer.appendChild(select)
// //     select.innerHTML = `<option>${'ciao ciao'}</option>`
// //     select.innerHTML = `<option>${'ciao ciao'}</option>`

// const loadData = (data, element) => {
//     let select = document.createElement('select')
//     select.classList.add('autocomplete-list')
//     element.appendChild(select)
//     // select.innerHTML = ""
//     // let innerElement = ""
//     //const optionsList = []
//     data.forEach((item) => {
//         let option = document.createElement('option')
//         option.setAttribute('value', item);
//         option.innerText = item
//         //optionsList.push(option)
//         document.querySelector('.autocomplete-list').appendChild(option)
//         //innerElement += `<option>${item}</option>`
//     });
    
//     // select.innerHTML = innerElement
// }

// const filterData = (data, searchText) => data.filter((el) => el.toLowerCase().includes(searchText.toLowerCase()))

// cityInput.addEventListener('input', function () {
//     // if (cityInput.value == ""){
//     //     loadData([], inputContainer)
//     // }else if (!cityInput.value == "") {
//     //     const filteredData = filterData(cities, countryInput.value)
//     //     loadData(filteredData, inputContainer)
//     // }
//     const filteredData = filterData(cities, cityInput.value)
//     loadData(filteredData, inputContainer)
// })

// btn.addEventListener('click', () => {
//     console.log(countryInput.value)
//     countryInput.innerHTML = ""
// })









































// let city = document.getElementById('search')
// let btn = document.getElementById('btn')

// // 
// async function a(valore){
//     let data = await fetch(`https://api.teleport.org/api/cities/?${valore}`)
//     let citta = data.json()
//     return citta
    
// }

// btn.addEventListener('click', () => {
//     let dato = city.value
//     console.log(a(dato));
// })

// let link = 'https://developers.teleport.org/assets/urban_areas.json'

// async function x(){
//     let data = await fetch(link)
//     return data
// }

// console.log(x());









