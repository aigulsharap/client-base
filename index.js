let counter = 0
const links = [
    './data/cars-1.json',
    './data/cars-2.json',
    './data/cars-3.json',
    './data/cars-4.json',
    './data/cars-5.json'
]

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function togglePreloader(show) {
    const preloader = document.querySelector('img')
    if (show) {
        preloader.style.display = 'block'
    } else {
        preloader.style.display = 'none'
    }
}

function renderCell(data) {
    return `<div class="table__cell">${data || '-'}</div>`
}

async function renderTable() {
    const table = document.querySelector('.table')

    if (links[counter]) {
        togglePreloader(true)
        const data = await getData(links[counter])

        data.forEach(item => {
            const tableRow = `<div class="table__row">
                ${renderCell(item.Name)}
                ${renderCell(item.Miles_per_Gallon)}
                ${renderCell(item.Cylinders)}
                ${renderCell(item.Displacement)}
                ${renderCell(item.Horsepower)}
                ${renderCell(item.Weight_in_lbs)}
                ${renderCell(item.Acceleration)}
                ${renderCell(item.Year)}
                ${renderCell(item.Origin)}
            </div>`
            table.innerHTML += tableRow
        })
        counter++
        togglePreloader(false)
    }
}

renderTable()

window.addEventListener('scroll', event => {
    if (scrollY + innerHeight >= document.body.scrollHeight) {

        renderTable()
    }
})
