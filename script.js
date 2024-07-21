"use strict";

const cityForm = document.getElementById("cityForm");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const cityList = document.getElementById("cityList");
const btnClear = document.getElementById("btnClear");

// let cities = [];

cityForm.addEventListener("submit", async (e) => {
  if (input.value) {
    await submitForm(e);
  } else {
    alert("Please enter a valid city name");
  }
});

async function submitForm(event) {
  event.preventDefault();
  await saveCity(input.value);
  let list = await getCities();
  addNewCity();

  input.value = "";
}

//functions to interact with the back-end:

// 0 - Showing saved cities once the page is loaded:
document.addEventListener("DOMContentLoaded", async () => {
  console.log("page loaded");
  let list = await getCities();
  showAllCities(list);
});

// 1 - Saving a new city to the DB:
async function saveCity(city) {
  await fetch("http://localhost:8000/city", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city }),
  });
}

// 2 - Getting a list of all the cities from the DB:
async function getCities() {
  let resp = await fetch("http://localhost:8000/city");
  let respJson = await resp.json();
  console.log(respJson);
  return respJson;
}

// create a function to render the saved cities to the user
function showAllCities(list) {
  // const div = document.createElement("div");
  // console.log(list);
  cityList.innerHTML = "";
  list.map((elem, i) => {
    const div = document.createElement("div");
    div.textContent = elem.city;
    div.className = "city";
    cityList.appendChild(div);
  });
}

//create a function to add a new city to the UI list
function addNewCity() {
  const div = document.createElement("div");
  div.textContent = input.value;
  div.className = "city";
  cityList.appendChild(div);
}

// 3 - Deleting all the cities from the DB:
async function deleteCities() {
  let resp = await fetch("http://localhost:8000/city", {
    method: "DELETE",
  });
  let respJson = await resp.json();
  console.log(respJson);
}

//Clear all the cities:
btnClear.addEventListener("click", async () => {
  await deleteCities();
  let list = await getCities();
  showAllCities(list);
  console.log("cities deleted");
});
