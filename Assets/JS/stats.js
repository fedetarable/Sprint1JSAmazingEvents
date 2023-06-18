const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";
const data = [];

async function getData() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    data.push(result);
  } catch (error) {
    console.log("Ocurrió un error al obtener los datos:", error);
  }
}

async function main() {
  let events, currentDate;
  await getData();
  events = data[0].events;
  currentDate = new Date(data[0].currentDate);

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
  //   console.log("futuro", upcomingEventsArr);
  //   console.log("pasado", pastEventsArr);

  function calculateAttendancePercentage(event) {
    return (event.assistance || event.estimate) / (event.capacity / 100);
  }

  function findEventsWithHighestAttendance(events) {
    let highestPercentage = 0;
    let eventsWithHighestAttendance = [];

    for (const event of events) {
      const attendancePercentage = calculateAttendancePercentage(event);

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
      const attendancePercentage = calculateAttendancePercentage(event);

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

  const eventsWithLargestCapacity = findEventsWithLargestCapacity(events);

  let statsTable1 = document.querySelector(".eventStats");
  //   let statsTable2 = document.querySelector(".eventStats2");
  //   let statsTable3 = document.querySelector(".eventStats3");

  //   console.log("Events with the largest capacity:");

  //   for (const event of eventsWithLargestCapacity) {
  //     console.log(`${event.name}: Capacity - ${event.capacity}`);
  //   }

  const eventsWithHighestAttendance = findEventsWithHighestAttendance(events);
  const eventsWithLowestAttendance = findEventsWithLowestAttendance(events);

  //   console.log("Events with the highest attendance percentage:");
  //   for (const event of eventsWithHighestAttendance) {
  //     console.log(`${event.name}: ${calculateAttendancePercentage(event)}%`);
  //   }

  //   console.log("Events with the lowest attendance percentage:");
  //   for (const event of eventsWithLowestAttendance) {
  //     console.log(`${event.name}: ${calculateAttendancePercentage(event)}%`);
  //   }

  let eventsWithHighestAttendancePercentage = calculateAttendancePercentage(
    eventsWithHighestAttendance[0]
  ).toFixed(2);

  let eventsWithLowestAttendancePercentage = calculateAttendancePercentage(
    eventsWithLowestAttendance[0]
  ).toFixed(2);

  statsTable1.innerHTML += `
            <td >${eventsWithHighestAttendance[0].name} ${eventsWithHighestAttendancePercentage}%</td>

            <td >${eventsWithLowestAttendance[0].name} ${eventsWithLowestAttendancePercentage}</td>

            <td >${eventsWithLargestCapacity[0].name} ${eventsWithLargestCapacity[0].capacity}</td>
            `;

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

  const revenuesPerCategoryUpcoming =
    calculateRevenuesPerCategory(upcomingEventsArr);
  const revenuesPerCategoryPast = calculateRevenuesPerCategory(pastEventsArr);

  //   console.log("Revenues per category for upcoming events:");
  //   console.log(revenuesPerCategoryUpcoming);

  //   console.log("Revenues per category for past events:");
  //   console.log(revenuesPerCategoryPast);

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

  const assistancePercentageByCategoryUpcoming =
    calculateAssistancePercentageByCategory(upcomingEventsArr);
  const assistancePercentageByCategoryPast =
    calculateAssistancePercentageByCategory(pastEventsArr);

  //   console.log("Percentage of assistance by category for upcoming events:");
  //   console.log(assistancePercentageByCategoryUpcoming);

  //   console.log("Percentage of assistance by category for past events:");
  //   console.log(assistancePercentageByCategoryPast);

  const tableBody2 = document.getElementById("table2");

  for (const key in revenuesPerCategoryUpcoming) {
    if (revenuesPerCategoryUpcoming.hasOwnProperty(key)) {
      const value = revenuesPerCategoryUpcoming[key];

      const row = document.createElement("tr");

      const keyCell = document.createElement("td");
      keyCell.textContent = key;

      const valueCell = document.createElement("td");
      valueCell.textContent = value;

      const assistanceCell = document.createElement("td");

      assistanceCell.textContent =
        assistancePercentageByCategoryUpcoming[key] || "-";

      row.appendChild(keyCell);
      row.appendChild(valueCell);
      row.appendChild(assistanceCell);

      tableBody2.appendChild(row);
    }
  }

  const tableBody3 = document.getElementById("table3");

  for (const key in revenuesPerCategoryPast) {
    if (revenuesPerCategoryPast.hasOwnProperty(key)) {
      const value = revenuesPerCategoryPast[key];

      const row = document.createElement("tr");

      const keyCell = document.createElement("td");
      keyCell.textContent = key;

      const valueCell = document.createElement("td");
      valueCell.textContent = value;

      const assistanceCell = document.createElement("td");
      assistanceCell.textContent =
        assistancePercentageByCategoryPast[key] || "-";

      row.appendChild(keyCell);
      row.appendChild(valueCell);
      row.appendChild(assistanceCell);

      tableBody3.appendChild(row);
    }
  }
}

main();
