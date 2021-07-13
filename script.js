'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const submitHandler = document.querySelector('.btn-country');
const inputCountry = document.querySelector('.input-country');

///////////////////////////////////////
const test = input => {
  console.log(input);
};
submitHandler.addEventListener('click', event => {
  event.preventDefault();
  console.log(inputCountry.value);
  FetchCountry(inputCountry.value);
  inputCountry.value = '';
});
const RenderCountry = countryObj => {
  let html = `<article class="country">
      <img class="country__img" src=${countryObj.flag} />
      <div class="country__data">
        <h3 class="country__name">${countryObj.name}</h3>
        <h4 class="country__region">${countryObj.region}</h4>
        <p class="country__row">
          <span>👫</span>${(countryObj.population / 1000000).toFixed(2)} Million
        </p>
        <p class="country__row">
          <span>🗣️</span>${countryObj.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${countryObj.currencies[0].code}    
        </p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('afterbegin', html);
  countriesContainer.style.opacity = 1;
};

const FetchCountry = country => {
  console.log(country);
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => {
      if (!res.ok)
        throw new Error(`Country not found STATUS CODE : ${res.status}`);
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      RenderCountry(data[0]);
      //   const neighbourCountryCode = data[0].borders[0];
      if (data[0].borders.length === 0)
        throw new Error(`No Neighbour Country for ${data[0].name}`);
      console.log(neighbourCountry);
      return fetch(
        `https://restcountries.eu/rest/v2/alpha/${neighbourCountryCode}`
      );
    })
    .then(res => {
      if (!res.ok)
        throw new Error(
          `Neighbour Country not Fount STATUS CODE : ${res.status}`
        );
      return res.json();
    })
    .then(data => {
      console.log(data);
      RenderCountry(data);
    })
    .catch(err => {
      console.error(err.message);
    });
};
//////////////////  FetchCountry in simple way  ///////////////////

// const GetResponse = (url, errmsg) => {
//   return fetch(url).then(res => {
//     if (!res.ok) throw new Error(errmsg);
//     return res.json();
//   });
// };

// const FetchCountry = country => {
//   GetResponse(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     `Country not found `
//   )
//     .then(data => {
//       console.log(data);
//       RenderCountry(data[0]);
//       if (data[0].borders.length === 0)
//         throw new Error(`No Neighbour Country for ${data[0].name}`);
//       console.log(neighbourCountry);
//       return GetResponse(
//         `https://restcountries.eu/rest/v2/alpha/${neighbourCountryCode}`,
//         `Neighbour Country not Found`
//       );
//     })
//     .then(data => {
//       console.log(data);
//       RenderCountry(data);
//     })
//     .catch(err => {
//       console.error(err.message);
//     });
// };

// FetchCountry('australia');

//////////////////////////  CODING CHALLANGE  ////////////////////////////////

const WhereAmI = (lat, lng) => {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      console.log(res);
      if (!res.ok)
        throw new Error(`Country Not Found STATUS CODE : ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(
        `You Are In ${data.standard.city}, ${data.standard.countryname}`
      );
      return fetch(
        `https://restcountries.eu/rest/v2/name/${data.standard.countryname}`
      );
    })
    .then(res => {
      if (!res.ok)
        throw new Error('Country Not Found STATUS CODE : ${res.status}');
      return res.json();
    })
    .then(data => {
      console.log(data);
      RenderCountry(data[0]);
    })
    .catch(err => console.log(err.message));
};

// WhereAmI(0, 0);
