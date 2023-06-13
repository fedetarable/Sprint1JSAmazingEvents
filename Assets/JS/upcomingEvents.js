const currentDate = new Date(data.currentDate);

const events = data.events;

let upcomingEventsArr = [];

function upcomingEvents(events, currentDate) {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    if (eventDate > currentDate) {
      upcomingEventsArr.push(event);
    }
    return upcomingEventsArr;
  });
}

upcomingEvents(events, currentDate);

const searchBar = document.querySelector(".searchBar");

searchBar.addEventListener("keyup", (e) => {
  const arrayYaBuscado = filtrarPorBusqueda(upcomingEventsArr);

  const arrayfinal = filtrarPorChek(arrayYaBuscado, selectedValues);
  displayEvents(arrayfinal);
});

function filtrarPorBusqueda(events) {
  const searchString = searchBar.value.toLowerCase();
  return events.filter((event) => {
    return event.name.toLowerCase().includes(searchString);
  });
}

let htmlUpcoming = "";

const displayEvents = (events) => {
  const htmlString = events
    .map((event) => {
      return `
            <div class="card mx-3 mt-3" style="width: 18rem;">
                <img src="${event.image}" class="cardImgStandard card-img-top" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between align-items-baseline w-100">
                        <p>${event.price}</p>
                        <a href="./detail.html?id=${event._id}" class="btn btn-danger">Details</a>
                    </div>
                </div>
            </div>
            `;
    })
    .join("");
  upcomingEventsContainer.innerHTML = htmlString;
};

const upcomingEventsContainer = document.querySelector(
  ".upcomingEventsContainer"
);

upcomingEventsContainer.innerHTML = htmlUpcoming;

displayEvents(upcomingEventsArr);

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
    <div class="form-check">
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
    const arrayYaBuscado = filtrarPorBusqueda(upcomingEventsArr);

    const arrayfinal = filtrarPorChek(arrayYaBuscado, selectedValues);

    displayEvents(arrayfinal);
  });
});

function filtrarPorChek(arrayEv, selectedValues) {
  if (selectedValues.length > 0) {
    const filteredEvents = arrayEv.filter((event) => {
      return selectedValues.some((selectedValue) =>
        event.category.includes(selectedValue)
      );
    });
    return filteredEvents;
  } else {
    return arrayEv;
  }
}
