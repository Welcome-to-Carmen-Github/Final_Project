/* 1.1 - função que guarda a informação do nome da cidade para usar na API e impede que o clique apague conteudo da caixa */
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  /* 1.1.2 - Ligaçao ao API para ir obter a informação metereologica */

  let apiKey = "634534df08f99d8a1bo3c3538aat8763";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityElement.textContent}&key=${apiKey}`;

  axios.get(url).then(workResponse);

  /* 1.1.3 - Função para ir buscar info à string de resposta da API */
  function workResponse(response) {
    console.log(response);
    let fullData = response.data;
    /* Temperatura */
    let current = Math.round(fullData.temperature.current);
    let newTemp = document.querySelector("#current-temp");
    newTemp.innerHTML = current;
    /* Descrição */
    let actuald = fullData.condition.description;
    let newDesc = document.querySelector("#description");
    newDesc.innerHTML = actuald;
    /* Humidade */
    let percentage = fullData.temperature.humidity;
    let hpercentage = document.querySelector("#humidity");
    hpercentage.innerHTML = percentage + " %";
    /* Vento */
    let wspeed = fullData.wind.speed;
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = wspeed + " km/h";
    /* Icon */
    let iconElement = document.querySelector("#current-icon");
    iconElement.innerHTML = `<img src="${fullData.condition.icon_url}" />`;
  }
}

/* 1.2.1 - Função para formatar a data para obter dia da semana e hora e minutos*/

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

/* 1 - Aguardar que o nome da cidade seja escrito e o botão clicado */

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

/* 1.2 - Vamos buscar a data atual e corre função formatDate*/

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
