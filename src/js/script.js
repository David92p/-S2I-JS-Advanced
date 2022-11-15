import '../css/style.css'

import { getData } from './functions/api-call'
import { removeElements, displayNames } from './functions/document'

const input = document.getElementById('input')


input.addEventListener("keyup", (e) => {
    getData(input.value)
    .then(response => {
        const data = response.data
        const cityData = data._embedded["city:search-results"]
        const listCity = []
        cityData.forEach(element => {
            listCity.push(element.matching_full_name)
        });
        return listCity.slice(0,6)
    })
    .then(listCity => {
        removeElements()
        for (let city of listCity){
            if(city.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != ""){
                let listItem = document.createElement('li')
                listItem.classList.add("list-items")
                listItem.style.cursor ="pointer"
                listItem.setAttribute("onclick", "displayNames('" +
                city + "')");
                let word = "<b>" + city.substr(0, input.value.length) + "</b>"
                word += city.substr(input.value.length)
                listItem.innerHTML = word
                document.querySelector(".list").appendChild(listItem)
            }
        }
    })
})




