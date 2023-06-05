
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

pastEvents(events, currentDate)

console.log("🚀 ~ file: home.js:20 ~ pastEventsArr:", pastEventsArr)

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

upcomingEvents(events, currentDate)

console.log("🚀 ~ file: home.js:22 ~ upcomingEventsArr:", upcomingEventsArr[0].image)

let htmlUpcoming = "";

for (let i = 0; i < upcomingEventsArr.length; i++) {
    htmlUpcoming += `
    
    <div class="card mx-3 mt-3" style="width: 18rem;">
                <img src="${upcomingEventsArr[i].image}" class="cardImgStandard card-img-top" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${upcomingEventsArr[i].name}</h5>
                    <p class="card-text">${upcomingEventsArr[i].description}</p>
                    <div class="d-flex justify-content-between align-items-baseline w-100">
                        <p>${upcomingEventsArr[i].price}</p>
                        <a href="http://127.0.0.1:5500/Assets/detail.html" class="btn btn-danger">Details</a>
                    </div>
                </div>
            </div>


    `;
}

const upcomingEventsContainer = document.querySelector(".upcomingEventsContainer");

upcomingEventsContainer.innerHTML = htmlUpcoming;

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
                        <a href="http://127.0.0.1:5500/Assets/detail.html" class="btn btn-danger">Details</a>
                    </div>
                </div>
            </div>


    `;
}

const pastEventsContainer = document.querySelector(".pastEventsContainer");

pastEventsContainer.innerHTML = htmlPast;






