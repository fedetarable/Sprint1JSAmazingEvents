const currentDate = new Date(data.currentDate);

const events = data.events;

let pastEventsArr = [];
function pastEvents(events, currentDate) {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    if (eventDate < currentDate) {
      pastEventsArr.push(event);
    }
    return pastEventsArr;
  });
}

pastEvents(events, currentDate);

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
  const searchString = e.target.value.toLowerCase();
  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchString) ||
      event.category.toLowerCase().includes(searchString)
    );
  });
  displayEvents(filteredEvents);
});

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
                        <a href="./Assets/detail.html?id=${event._id}" class="btn btn-danger">Details</a>
                    </div>
                </div>
            </div>
            `;
    })
    .join("");
  eventContainer.innerHTML = htmlString;
};

const eventContainer = document.querySelector(".eventContainer");

displayEvents(events);

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
console.log(checkboxes);

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked);
    console.log(value);

    if (checked) {
      const filteredEvents = events.filter((event) => {
        return event.category.includes(value);
      });
      console.log(filteredEvents);
      displayEvents(filteredEvents);
    } else {
      displayEvents(events);
    }
  });
});

// let htmlUpcoming = "";

// for (let i = 0; i < upcomingEventsArr.length; i++) {
//   htmlUpcoming += `

//     <div class="card mx-3 mt-3" style="width: 18rem;">
//                 <img src="${upcomingEventsArr[i].image}" class="cardImgStandard card-img-top" alt="...">
//                 <div class="card-body d-flex flex-column align-items-center">
//                     <h5 class="card-title">${upcomingEventsArr[i].name}</h5>
//                     <p class="card-text">${upcomingEventsArr[i].description}</p>
//                     <div class="d-flex justify-content-between align-items-baseline w-100">
//                         <p>${upcomingEventsArr[i].price}</p>
//                         <a href="./Assets/detail.html" class="btn btn-danger">Details</a>
//                     </div>
//                 </div>
//             </div>

//     `;
// }

// const upcomingEventsContainer = document.querySelector(
//   ".upcomingEventsContainer"
// );

// upcomingEventsContainer.innerHTML = htmlUpcoming;

// let htmlPast = "";

// for (let i = 0; i < pastEventsArr.length; i++) {
//   htmlPast += `

//     <div class="card mx-3 mt-3" style="width: 18rem;">
//                 <img src="${pastEventsArr[i].image}" class="cardImgStandard card-img-top" alt="...">
//                 <div class="card-body d-flex flex-column align-items-center">
//                     <h5 class="card-title">${pastEventsArr[i].name}</h5>
//                     <p class="card-text">${pastEventsArr[i].description}</p>
//                     <div class="d-flex justify-content-between align-items-baseline w-100">
//                         <p>${pastEventsArr[i].price}</p>
//                         <a href="./Assets/detail.html" class="btn btn-danger">Details</a>
//                     </div>
//                 </div>
//             </div>

//     `;
// }

// const pastEventsContainer = document.querySelector(".pastEventsContainer");

// pastEventsContainer.innerHTML = htmlPast;
