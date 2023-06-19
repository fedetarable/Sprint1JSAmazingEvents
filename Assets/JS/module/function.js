const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";
const data = [];

async function getData() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Ocurrió un error al obtener los datos:", error);
  }
}

// STATS

function pastEvents(events, currentDate) {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate < currentDate;
  });
}

function upcomingEvents(events, currentDate) {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate > currentDate;
  });
}

function calculateAttendancePercentage(event) {
  return (event.assistance || event.estimate) / (event.capacity / 100);
}

function calculateAttendanceP(event) {
  return event.assistance / (event.capacity / 100);
}

function findEventsWithHighestAttendance(events) {
  let highestPercentage = 0;
  let eventsWithHighestAttendance = [];

  for (const event of events) {
    const attendancePercentage = calculateAttendanceP(event);

    if (attendancePercentage > highestPercentage) {
      highestPercentage = attendancePercentage;
      eventsWithHighestAttendance = [event];
    } else if (attendancePercentage === highestPercentage) {
      eventsWithHighestAttendance.push(event);
    }
  }

  return eventsWithHighestAttendance;
}

function findEventsWithLowestAttendance(events) {
  let lowestPercentage = Infinity;
  let eventsWithLowestAttendance = [];

  for (const event of events) {
    const attendancePercentage = calculateAttendanceP(event);

    if (attendancePercentage < lowestPercentage) {
      lowestPercentage = attendancePercentage;
      eventsWithLowestAttendance = [event];
    } else if (attendancePercentage === lowestPercentage) {
      eventsWithLowestAttendance.push(event);
    }
  }

  return eventsWithLowestAttendance;
}

function findEventsWithLargestCapacity(events) {
  let largestCapacity = -Infinity;
  let eventsWithLargestCapacity = [];

  for (const event of events) {
    if (event.capacity > largestCapacity) {
      largestCapacity = event.capacity;
      eventsWithLargestCapacity = [event];
    } else if (event.capacity === largestCapacity) {
      eventsWithLargestCapacity.push(event);
    }
  }

  return eventsWithLargestCapacity;
}

function calculateRevenue(event) {
  return (event.assistance || event.estimate) * event.price;
}

function calculateRevenuesPerCategory(events) {
  const revenuesPerCategory = {};

  for (const event of events) {
    const revenue = calculateRevenue(event);
    const category = event.category;

    if (revenuesPerCategory.hasOwnProperty(category)) {
      revenuesPerCategory[category] += revenue;
    } else {
      revenuesPerCategory[category] = revenue;
    }
  }

  return revenuesPerCategory;
}

function calculateAssistancePercentageByCategory(events) {
  const assistancePercentageByCategory = {};

  for (const event of events) {
    const attendancePercentage = calculateAttendancePercentage(event);
    const category = event.category;

    if (assistancePercentageByCategory.hasOwnProperty(category)) {
      assistancePercentageByCategory[category].push(attendancePercentage);
    } else {
      assistancePercentageByCategory[category] = [attendancePercentage];
    }
  }

  for (const category in assistancePercentageByCategory) {
    const percentages = assistancePercentageByCategory[category];
    const totalPercentage = percentages.reduce(
      (sum, percentage) => sum + percentage,
      0
    );
    const averagePercentage = totalPercentage / percentages.length;
    assistancePercentageByCategory[category] = averagePercentage.toFixed(2);
  }

  return assistancePercentageByCategory;
}

// HOME

export function filtrarPorBusqueda(events, searchBar) {
  const searchString = searchBar.value.toLowerCase();
  return events.filter((event) => {
    return event.name.toLowerCase().includes(searchString);
  });
}

export const displayEvents = (events, eventContainer, pastOrUpcoming) => {
  if (events.length > 0) {
    const htmlString = events
      .map((event) => {
        return `
          <div class="card mx-3 mt-3" style="width: 18rem;">
              <img src="${
                event.image
              }" class="cardImgStandard card-img-top" alt="...">
              <div class="card-body d-flex flex-column align-items-center">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
                  <div class="d-flex justify-content-between align-items-baseline w-100">
                      <p>$${event.price}</p>
                    ${
                      pastOrUpcoming
                        ? `<a href="./detail.html?id=${event._id}" class="btn btn-danger">Details</a>`
                        : `<a href="./Assets/detail.html?id=${event._id}" class="btn btn-danger">Details</a>`
                    }
                  </div>
              </div>
          </div>
          `;
      })
      .join("");
    eventContainer.innerHTML = htmlString;
  } else {
    eventContainer.innerHTML = `<h3 class="text-center my-4">No events found, try with another one.</h3>`;
  }
};

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

export {
  getData,
  pastEvents,
  upcomingEvents,
  calculateAttendancePercentage,
  calculateAttendanceP,
  findEventsWithHighestAttendance,
  findEventsWithLowestAttendance,
  findEventsWithLargestCapacity,
  calculateRevenue,
  calculateRevenuesPerCategory,
  calculateAssistancePercentageByCategory,
  filtrarPorChek,
};
