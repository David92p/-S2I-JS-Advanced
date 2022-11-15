
export const removeElements = () =>{
    let items = document.querySelectorAll('.list-items')
    items.forEach(el => el.remove())
}

export const displayNames = (value) => {
    input.value = value
    removeElements()
}

//export const filterData = (data, searchText) => data.filter((el) => el.toLowerCase().includes(searchText.toLowerCase()))

// export const loadData = (data, element) => {
//     const select = document.createElement('select')
//     select.classList.add('autocomplete-list')
//     select.setAttribute('name', 'autocomplete-list')
//     element.append(select)

    //element.innerHTML = ""
    //let innerElement = ""
    //.forEach((item) => {
        // let option = document.createElement('option');
        // option
        // innerElement += `<option>${item}</option>`
        // innerElement.setAttribute('value', item)
        // element.innerHTML = innerElement
//         let option = document.createElement('option')
//         option.setAttribute('value', item)
//         option.textContent = item
//         select.append(option)
//     });
// }

