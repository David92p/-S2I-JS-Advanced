export const createIcon =  (img) =>  {
    const logo = new Image()
    logo.src = img
    logo.style.width = '25px'
    logo.style.height = '25px'
    return logo
}