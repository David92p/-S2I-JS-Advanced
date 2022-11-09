import '../css/style.css'
const citylist = require('./json/citylist.json')

let cities = [];

for (let city of Object.keys(citylist)){
    cities.push(city)
    cities.sort()
}

const inputContainer = document.querySelector('.input-container')
const citiesListElement = document.querySelector('.autocomplete-list')
const countryInput = document.querySelector('#search')
const btn = document.querySelector('.btn')

const loadData = (data, element) => {
    let select = document.createElement('select')
    select.classList.add('autocomplete-list')
    element.append(select)
    select.innerHTML = ""
    let innerElement = ""
    data.forEach((item) => {
        innerElement += `<option>${item}</option>`
    });
    select.innerHTML = innerElement
}

const filterData = (data, searchText) => data.filter((el) => el.toLowerCase().includes(searchText.toLowerCase()))


countryInput.addEventListener('input', function () {
    if (countryInput.value == ""){
        loadData([], inputContainer)
    }else if (!countryInput.value == "") {
        const filteredData = filterData(cities, countryInput.value)
        loadData(filteredData, inputContainer)
    }
})

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









