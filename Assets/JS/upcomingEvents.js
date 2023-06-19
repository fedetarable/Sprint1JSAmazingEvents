import {
  getData,
  upcomingEvents,
  filtrarPorBusqueda,
  displayEvents,
  filtrarPorChek,
} from "./module/function.js";

async function main() {
  let currentDate;
  const data = await getData();
  const events = data.events;

  currentDate = new Date(data.currentDate);
  let upcomingEventsArr = upcomingEvents(events, currentDate);

  const searchBar = document.querySelector(".searchBar");

  searchBar.addEventListener("keyup", (e) => {
    const arrayYaBuscado = filtrarPorBusqueda(upcomingEventsArr, searchBar);

    const arrayfinal = filtrarPorChek(arrayYaBuscado, selectedValues);
    displayEvents(arrayfinal, upcomingEventsContainer, true);
  });

  const upcomingEventsContainer = document.querySelector(
    ".upcomingEventsContainer"
  );

  displayEvents(upcomingEventsArr, upcomingEventsContainer, true);

  const categories = events
    .map((event) => {
      return event.category;
    })
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const categoriesContainer = document.querySelector(".categoriesContainer");
  let htmlCategories = "";

  for (let i = 0; i < categories.length; i++) {
    htmlCategories += `
    <div class="form-check mx-2">
        <input class="form-check-input" type="checkbox" value="${categories[i]}" id="flexCheckDefault${i}">
        <label class="form-check-label" for="flexCheckDefault${i}">
            ${categories[i]}
        </label>
    </div>
    `;

    categoriesContainer.innerHTML = htmlCategories;
  }

  const checkboxes = document.querySelectorAll(".form-check-input");

  const selectedValues = [];

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const checked = e.target.checked;
      const value = e.target.value;

      if (checked) {
        selectedValues.push(value);
      } else {
        const index = selectedValues.indexOf(value);
        if (index > -1) {
          selectedValues.splice(index, 1);
        }
      }
      const arrayYaBuscado = filtrarPorBusqueda(upcomingEventsArr, searchBar);

      const arrayfinal = filtrarPorChek(arrayYaBuscado, selectedValues);

      displayEvents(arrayfinal, upcomingEventsContainer, true);
    });
  });
}

main();
