const getDetail = localStorage.getItem('data')


// Get data from API
async function getData() {
    try {

        const API = 'https://restcountries.com/v3.1/all';
        const data = await (await fetch(API)).json();

        if (getDetail) {
            const detailElem = document.querySelector('.detail')
            const detail = data.filter(data => data.name.common.toLowerCase().includes(getDetail))

            detail.forEach(element => {
                const { name, flags, population, region, subregion, capital, currencies, tld, languages } = element;
                console.log(element)
                detailElem.innerHTML = ` 
                

            <div class='flag'>
                <img src="${flags.png}" alt="">
            </div>
            <div class="text">
                <h1 class="countryName">${name.common}</h1>
                <div class="sub_text">
                    <div class="left">
                        <p class="native_name"> <b>Native name :</b> ${Object.values(name.nativeName)[0]?.common}</p>
                        <p class="population"><b>Population :</b> ${population}</p>
                        <p class="region"><b>Region : </b> ${region}</p>
                        <p class="subregion"><b>Subregion :</b> ${subregion}</p>
                        <p class="currencies"><b>Currencies :</b> ${Object.values(currencies).map(currencie => currencie.name)}
                        </p>
                    </div>
                    <div class="right">
                        <p class="topLevelDomain"><b>Top Level Domain</b>: ${tld}</p>
                        <p class="languages"><b>Languages :</b> ${Object.values(languages).map(lang => " " + lang)}</p>
                        <p class="languages"><b>Capital :</b> ${capital}</p>
                    </div>
                </div>
                <div class="border">
                    <div class="boredr_text">Boredr Country:</div>

                    <div class="boredr_country">
                        <a href="#">India</a>
                        <a href="#">India</a>
                        <a href="#">India</a>
                    </div>
                </div>
            </div>
            
                `;
            });



        }

    } catch (error) {
        console.log(error)
    }
}
getData();




