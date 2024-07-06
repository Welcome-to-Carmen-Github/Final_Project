/* Função que guarda a informação do nome da cidade para usar na API e impede que o clique apague conteudo da caixa */
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
  apiForecast(searchInputElement.value);
}

/* Ligaçao ao API para ir obter a informação metereologica */
function searchCity(city) {
  let apiKey = "634534df08f99d8a1bo3c3538aat8763";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(url).then(workResponse);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
}
/* Função para ir buscar info à string de resposta da API */
function workResponse(response) {
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

/* Função para formatar a data para obter dia da semana e hora e minutos*/

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

/* Aguardar que o nome da cidade seja escrito e o botão clicado */

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

/* Vamos buscar a data atual e corre função formatDate*/

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

/* ir buscar informação de forecast ao API */

function apiForecast(city) {
  let apiKey = "634534df08f99d8a1bo3c3538aat8763";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=${units}`;
  axios(apiUrl).then(displayForecast);
}

/* fazer um java template para criar 5 dias de previsão*/

/* vai traduzir o timestamp em dia da semana */
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="wheather-forecast-week">
         <div class="wheather-forecast-day">${formatDay(day.time)} </div>
         <div class="wheather-forecast-icon"> <img src = "${
           day.condition.icon_url
         }"></div>
         <div class="wheather-forecast-temps">
           <div class="wheather-forecast-temp">
             <strong>${Math.round(day.temperature.maximum)}º</strong>
           </div>
         <div class="wheather-forecast-temp">${Math.round(
           day.temperature.minimum
         )}º</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#fore-cast");
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Palmela");
