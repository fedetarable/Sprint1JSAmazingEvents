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
  const contenedorDetail = document.getElementById("contenedorDetail");
  const params = new URLSearchParams(window.location.search);

  events = data[0].events;
  console.log(events);

  const eid = params.get("id");

  const idEncontrado = events.find((event) => event._id == eid);

  contenedorDetail.innerHTML = `
<div class="cardDetailImg d-flex flex-sm-column justify-content-center">
        <img class="imgDetail" src="${idEncontrado.image}" alt="${
    idEncontrado.name
  }" />
</div>
<section class="sectionDetail d-flex flex-column justify-content-center align-items-center bg-light p-3">
        <h3>${idEncontrado.name}</h3>
        <p>${idEncontrado.description}</p>
        <div class="d-flex justify-content-between w-100">
            <p>category:${idEncontrado.category}</p>
            ${
              idEncontrado.assistance !== undefined
                ? `<p>Assistance: ${idEncontrado.assistance}</p>`
                : `<p>Estimate: ${idEncontrado.estimate}</p>`
            }

        </div>
        <div class="d-flex justify-content-between w-100">
            <p>Place:${idEncontrado.place}</p>
            <p>Capacity:${idEncontrado.capacity}</p>
        </div>
        <div class="d-flex justify-content-between w-100">
            <p>date:${idEncontrado.date}</p>
            <p>Price:$${idEncontrado.price}</p>
        </div>
        <a class="btn btn-primary" href="#" role="button">Comprar</a>
    </section>`;
}

main();
