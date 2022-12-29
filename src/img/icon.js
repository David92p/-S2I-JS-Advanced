export const createIcon =  (img) =>  {
    const logo = new Image()
    logo.src = img
    logo.style.width = '20px'
    logo.style.height = '20px'
    return logo
}