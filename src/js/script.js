import '../css/style.css'
const citylist = require('./json/citylist.json')

let cities = [];

for (let city of Object.keys(citylist)){
    cities.push(city)
}
cities.sort()
console.log(cities);
const citiesListElement = document.querySelector('.autocomplete-list')
const countryInput = document.querySelector('#search')

// function loadData(data, element){
//     element.innerHTML = ""
//     let innerElement = ""
//     data.forEach((item) => {
//         innerElement += `<li>${item}</li>`
//     });
//     element.innerHTML = innerElement
// }

// function filterData(data, searchText){
//     return data.filter((el) => el.toLowerCase().includes(searchText.toLowerCase()))
// }


// countryInput.addEventListener('input', function (e) {
//     e.preventDefault()
//     const filteredData = filterData(cities, countryInput.value)
//     loadData(filteredData, citiesListElement)
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









