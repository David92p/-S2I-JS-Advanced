
//export const filterData = (data, searchText) => data.filter((el) => el.toLowerCase().includes(searchText.toLowerCase()))

export const loadData = (data, element) => {
    const select = document.createElement('select')
    select.classList.add('autocomplete-list')
    select.setAttribute('name', 'autocomplete-list')
    element.append(select)

    //element.innerHTML = ""
    //let innerElement = ""
    data.forEach((item) => {
        // let option = document.createElement('option');
        // option
        // innerElement += `<option>${item}</option>`
        // innerElement.setAttribute('value', item)
        // element.innerHTML = innerElement
        let option = document.createElement('option')
        option.setAttribute('value', item)
        option.textContent = item
        select.append(option)
    });
}

export const citySelected = (optionsList, resultScreen) => {
    let value = optionsList.value
    resultScreen.innerHTML = value
}




// const selectData = (element) => {ùù

//     let options = element.chieldNodes()
//     console.log(element);
// }


// countryInput.addEventListener('click', function () {
//     if (countryInput.value == ""){
//         loadData([], inputContainer)
//     }else if (!countryInput.value == "") {
//         const filteredData = filterData(cities, countryInput.value)
//         loadData(filteredData, inputContainer)
//         let options = document.querySelector('.autocomplete-list')
//         options.options[options.options.selectedIndex].selected = true;
        
//         for (let i=0; i<options.length; i++){
//             if (countryInput.value == options[i]){
//                 console.log(options[i]);
//             }
//         }
//     }

// })


