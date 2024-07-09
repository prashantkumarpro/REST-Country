const cardContainer = document.querySelector('.cards');
const headerElem = document.querySelector('header');
const darkModeBtn = document.querySelector('#dark-mode');
const lightModeBtn = document.querySelector('#light-mode');
const body = document.querySelector('body');
const lodar = document.querySelector('.loading')
const seacrchInputElement = document.querySelector('input[type="text"]');
const selectElem = document.querySelector('select');
const filterElem = document.querySelectorAll('select option');
let detailElem = document.querySelector('.detail');
let detailContainer = document.querySelector('.detail-container')

let datas = []

// get data from API CALL
async function getData() {
    try {
        if (lodar) lodar.classList.add('active');
        const API = 'https://restcountries.com/v3.1/all';
        const data = await (await fetch(API)).json();
        datas.push(data)
        datas[0].map((item) => displayCard(item))

        if (cardContainer) {
            const cards = document.querySelectorAll('a')
                .forEach(card => {
                    detailHandler(card)
                })
        }

        if (lodar) lodar.classList.remove('active');
    } catch (error) {
        if (error) console.log(error)
    }
}
getData();

// search country name 
if (seacrchInputElement) {
    seacrchInputElement.addEventListener('input', function () {
        const countryName = this.value.toLowerCase()
        const cards = document.querySelectorAll('.card');

        cards.forEach((card) => {
            const cardTitle = card.children[1].children[0].textContent.toLowerCase();
            // if (!cardTitle.includes(countryName)) {
            //     card.classList.add('active')
            // } else {
            //     card.classList.remove('active')
            // }
        })

        // Filter the data based on search term
        const filteredData = datas[0].filter(data => data.name.common.toLowerCase().includes(countryName))

        cardContainer.innerHTML = '' // Removes all existing cards

        // Display the filtered data
        filteredData.forEach(element => {
            displayCard(element)

            // handel each card on clickd
            if (cardContainer) {
                const cards = document.querySelectorAll('a');
                cards.forEach(card => {
                    detailHandler(card)
                })
            }

        });

    })
}

// filterd by region 
if (selectElem) {
    selectElem.addEventListener('change', (e) => {
        const region = e.target.value.toLowerCase()
        const filteredRegions = datas[0].filter(filterRegion => filterRegion.region.toLowerCase() === region);
        cardContainer.innerHTML = '';
        filteredRegions.forEach(regionItem => displayCard(regionItem))

        // when region emtpy then display all data 
        if (region === "") datas[0].forEach(data => displayCard(data));

        // when click on card then get detail of the card
        if (cardContainer) {
            const cards = document.querySelectorAll('a');
            cards.forEach(card => {
                detailHandler(card)
            })
        }
    })
}


function displayCard(data) {
    let linkElem = document.createElement('a');
    linkElem.href = "singlePage.html"
    // linkElem.target = '_blank'

    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    let cardImg = document.createElement('div');
    cardImg.classList.add('card_img');

    let img = document.createElement('img');
    img.src = `${data.flags.png}`;

    let textDiv = document.createElement('div');
    textDiv.classList.add('texts')

    let countryName = document.createElement('h1');
    countryName.classList.add('country_name')
    countryName.textContent = `${data.name.common}`;

    let pupulationElem = document.createElement('p');
    pupulationElem.textContent = 'Population : '
    let pupulationText = document.createElement('span');
    pupulationText.textContent = `${data.population}`

    let regionElem = document.createElement('p');
    regionElem.textContent = 'Region : '
    let regionText = document.createElement('span');
    regionText.textContent = `${data.region}`

    let capitalElem = document.createElement('p');
    capitalElem.textContent = 'Capital : '
    let capitalText = document.createElement('span');
    capitalText.textContent = `${data.capital}`

    // append all elements to the their parents
    capitalElem.append(capitalText)
    regionElem.append(regionText)
    pupulationElem.append(pupulationText)
    textDiv.append(countryName, pupulationElem, regionElem, capitalElem)
    cardImg.append(img)
    cardDiv.append(cardImg, textDiv)
    linkElem.append(cardDiv)
    if (cardContainer) cardContainer.append(linkElem)

}

// handel detail of each card 
function detailHandler(card) {
    card.addEventListener('click', function (e) {
        const countryElem = e.currentTarget.children[0].children[1].children[0];
        if (countryElem.className.includes('country_name')) {
            const countryName = countryElem.textContent.toLowerCase();
            detailElem = document.querySelector('.detail');
            // stroe the data to local storage 
            localStorage.setItem('data', countryName)
        }
    })
}

const bodyTheme = localStorage.getItem('dark');
const headerTheme = localStorage.getItem('headerDark');
if (bodyTheme && headerTheme) {
    body.classList.add(bodyTheme);
    headerElem.classList.add(headerTheme)
}

// dark mode code 
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function () {
        lightModeBtn.classList.remove('active');
        darkModeBtn.classList.add('active');
        headerElem.classList.add('active')
        body.classList.add('theme')
        localStorage.setItem('dark', 'theme')
        localStorage.setItem('headerDark', 'active')
    })
}

// light mode code
if (lightModeBtn) {
    lightModeBtn.addEventListener('click', function () {
        localStorage.removeItem('headerDark', 'active')
        localStorage.removeItem('dark', 'theme')
        darkModeBtn.classList.remove('active');
        lightModeBtn.classList.add('active');
        headerElem.classList.remove('active')
        body.classList.remove('theme')
    })
}


