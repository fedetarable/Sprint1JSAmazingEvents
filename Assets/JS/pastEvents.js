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

console.log("🚀 ~ file: home.js:20 ~ pastEventsArr:", pastEventsArr);

let htmlPast = "";

for (let i = 0; i < pastEventsArr.length; i++) {
  htmlPast += `
    
    <div class="card mx-3 mt-3" style="width: 18rem;">
                <img src="${pastEventsArr[i].image}" class="cardImgStandard card-img-top" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${pastEventsArr[i].name}</h5>
                    <p class="card-text">${pastEventsArr[i].description}</p>
                    <div class="d-flex justify-content-between align-items-baseline w-100">
                        <p>${pastEventsArr[i].price}</p>
                        <a href="./detail.html?id=${pastEventsArr[i]._id}" class="btn btn-danger">Details</a>
                    </div>
                </div>
            </div>


    `;
}

const pastEventsContainer = document.querySelector(".pastEventsContainer");

pastEventsContainer.innerHTML = htmlPast;
