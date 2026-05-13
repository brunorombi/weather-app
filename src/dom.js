const form = document.querySelector("form");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const weatherContent = document.querySelector("#content");

import { getData, Weather } from "./api";

export default function initApp() {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const errorMessage = document.querySelector(".error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMessage.classList.remove("active");
    errorMessage.textContent = "";
    const searchValue = input.value.trim();

    if (input.validity.valueMissing) {
      displayError("You must enter a city name");
      return;
    }

    if (!/[a-zA-Z]/.test(searchValue)) {
      displayError("Your search should contain only letters");
      return;
    }

    const weather = await getWeather(searchValue);

    if (weather) {
      displayWeather(weather);
      console.log(weather);
    } else {
      displayError(`Was not possible to find ${searchValue}`);
    }
  });
}

async function getWeather(value) {
  try {
    const data = await getData(value);
    const weather = new Weather(data);
    return weather;
  } catch (error) {
    console.error(error);
    displayError();
  }
}

function displayError(error) {
  const errorMessage = document.querySelector(".error");
  errorMessage.textContent = "";
  errorMessage.classList.add("active");
  errorMessage.textContent = error;
}

async function displayWeather(weather) {
  document.querySelector("#content").style.display = "flex";

  const icon = await import(`./assets/${weather.icon}.svg`);
  const img = document.querySelector(".weather-icon");
  img.src = icon.default;

  document.querySelector(".city").textContent = weather.city;
  document.querySelector(".temp").textContent = `${weather.temp} °C`;
  document.querySelector(".description").textContent = weather.description;
  document.querySelector(".time").textContent = weather.time.slice(0, -3);
  document.querySelector(".date");

  const dateStr = weather.date;
  const dateObj = new Date(`${dateStr}T00:00:00`);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = dateObj.toLocaleDateString("en-US", options).replace(/,/g, '');
  document.querySelector(".date").textContent = date;
}
