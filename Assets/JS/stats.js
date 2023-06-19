import {
  getData,
  pastEvents,
  upcomingEvents,
  calculateAttendanceP,
  findEventsWithHighestAttendance,
  findEventsWithLowestAttendance,
  findEventsWithLargestCapacity,
  calculateRevenuesPerCategory,
  calculateAssistancePercentageByCategory,
} from "./module/function.js";

async function main() {
  const data = await getData();
  const events = data.events;
  const currentDate = new Date(data.currentDate);
  const pastEventsArr = pastEvents(events, currentDate);
  const upcomingEventsArr = upcomingEvents(events, currentDate);

  const eventsWithLargestCapacity = findEventsWithLargestCapacity(events);

  let statsTable1 = document.querySelector(".eventStats");

  const eventsWithHighestAttendance = findEventsWithHighestAttendance(events);
  const eventsWithLowestAttendance = findEventsWithLowestAttendance(events);

  let eventsWithHighestAttendancePercentage = calculateAttendanceP(
    eventsWithHighestAttendance[0]
  ).toFixed(2);

  let eventsWithLowestAttendancePercentage = calculateAttendanceP(
    eventsWithLowestAttendance[0]
  ).toFixed(2);

  statsTable1.innerHTML += `
            <td >${eventsWithHighestAttendance[0].name} ${eventsWithHighestAttendancePercentage}%</td>

            <td >${eventsWithLowestAttendance[0].name} ${eventsWithLowestAttendancePercentage}%</td>

            <td >${eventsWithLargestCapacity[0].name} ${eventsWithLargestCapacity[0].capacity}</td>
            `;

  const revenuesPerCategoryUpcoming =
    calculateRevenuesPerCategory(upcomingEventsArr);
  const revenuesPerCategoryPast = calculateRevenuesPerCategory(pastEventsArr);

  const assistancePercentageByCategoryUpcoming =
    calculateAssistancePercentageByCategory(upcomingEventsArr);
  const assistancePercentageByCategoryPast =
    calculateAssistancePercentageByCategory(pastEventsArr);

  const tableBody2 = document.getElementById("table2");

  for (const key in revenuesPerCategoryUpcoming) {
    if (revenuesPerCategoryUpcoming.hasOwnProperty(key)) {
      const value = revenuesPerCategoryUpcoming[key];

      const row = document.createElement("tr");

      const keyCell = document.createElement("td");
      keyCell.textContent = key;

      const valueCell = document.createElement("td");
      valueCell.textContent = "$" + value;

      const assistanceCell = document.createElement("td");

      assistanceCell.textContent =
        assistancePercentageByCategoryUpcoming[key] + "%" || "-";

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
      valueCell.textContent = "$" + value;

      const assistanceCell = document.createElement("td");
      assistanceCell.textContent =
        assistancePercentageByCategoryPast[key] + "%" || "-";

      row.appendChild(keyCell);
      row.appendChild(valueCell);
      row.appendChild(assistanceCell);

      tableBody3.appendChild(row);
    }
  }
}

main();
