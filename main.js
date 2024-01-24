// Constante para el precio de un ticket
const priceTicket = 9.90;

// Array con objetos de películas
const Peliculas = [
    { id: 1, Movie: "Space Jam", precio: 9.90 },
    { id: 2, Movie: "WWF Royal Rumble", precio: 10.90 },
    { id: 3, Movie: "AEW Revolution", precio: 11.90 },
    { id: 4, Movie: "WWF Royal Rumble 2024 Live", precio: 15.99 },
];

// Función de validación
function priceCost(numTickets, ticketPrice) {
    return numTickets > 0 && ticketPrice > 0;
}

// Función para la venta de tickets
function buyTicket(numbTicket, totalCost, selectedMovie) {
    // Crear un elemento para mostrar el costo en el DOM
    const costElement = document.createElement("p");
    document.body.appendChild(costElement);

    // Actualizar el contenido del elemento con el costo
    costElement.innerHTML = `Your cost for ${numbTicket} tickets of "${selectedMovie.Movie}": $${totalCost}`;

    // Almacenar información en sessionStorage
    sessionStorage.setItem("ultimaCompra", JSON.stringify({
        pelicula: selectedMovie.Movie,
        cantidadTickets: numbTicket,
        costoTotal: totalCost
    }));
}

// Agregar evento para mostrar cartelera al hacer clic en el botón
document.getElementById("verCartelera").addEventListener("click", function() {
    const carteleraString = Peliculas.map(
        (item) => `\n ${item.id} ${item.Movie} - Price:$${item.precio}`
    ).join('\n');

    Swal.fire({
        title: 'Cartelera de Películas',
        text: `Las siguientes películas están disponibles:${carteleraString}`,
        icon: 'info',
        confirmButtonText: 'OK'
    });
});

// Agregar evento para seleccionar película al hacer clic en el botón
document.getElementById("seleccionarPelicula").addEventListener("click", function() {
    Swal.fire({
        title: 'Seleccionar Película',
        text: 'Ingrese el número de la película que desea ver:',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Seleccionar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value) {
                    resolve();
                } else {
                    resolve('Ingrese un número válido de película');
                }
            });
        }
    }).then((result) => {
        if (result.value) {
            let search = Number(result.value);
            window.selectedMovie = Peliculas.find((item) => item.id === search);

            if (window.selectedMovie) {
                Swal.fire({
                    title: 'Película Seleccionada',
                    text: `Has seleccionado la película: "${window.selectedMovie.Movie}"`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Película no disponible',
                    text: 'Lo sentimos, la película seleccionada no está disponible.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });
});
// Agregar evento para comprar entradas al hacer clic en el botón
document.getElementById("comprarEntradas").addEventListener("click", function() {
    let numbTicket = Number(prompt("How many Tickets?"));
    let nameTicket = prompt("Do you want rename your tickets? Yes or No").toLowerCase();

    if (nameTicket === "yes") {
        let ticketNames = "";
        for (let name = 1; name <= numbTicket; name++) {
            let nombre = prompt(`Enter your Name for the ${name} ticket`);
            ticketNames += `Ticket ${name}: ${nombre}\n`;
        }
        document.getElementById("nombreTickets").style.display = "block";
        document.getElementById("nombreTickets").innerText = ticketNames;
    }

    let totalCost = numbTicket * priceTicket;

    if (priceCost(numbTicket, priceTicket)) {
        Swal.fire({
            title: 'Compra Exitosa',
            text: `El costo total por ${numbTicket} entradas es: $${totalCost}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Llamamos a la función de venta de tickets
        buyTicket(numbTicket, totalCost, window.selectedMovie);
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingresa valores válidos.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
