let ticket = [];

let stockDestinos;

let val = "";

document.addEventListener("DOMContentLoaded", function() {

    $("#ticket-cancel").on("click", function() {
        $(".ticket-dropdown").slideToggle("slow");

        Capturar();

        Vaciar();

        if ($(".feed-ticket").attr("style", "display: initial")) {

            $(".feed-ticket").attr("style", "display: none");
        }


    })

    $("#ticket-submit").on("click", function() {

        $(".feed-ticket").attr("style", "display: initial");

        let cont = true;

        $(document).on("keypress", function(e) {

            while (e.keyCode == 13 && cont == true) {

                cont = false;

                EnviarDatos();

                $(".feed-ticket").attr("style", "display: none");

                continue;
            }


        })

    })

    $.ajax({

        url: 'json/destinos.json',
        success: function(data, status, xhr) {
            stockDestinos = data;
            DibujarMenu(stockDestinos);


        },
        error: function(xhr, status, errorThrown) {
            console.log(xhr)
            console.log(status)
            console.log(errorThrown)
        }

    });

    document.querySelector("#sites").addEventListener("click", DesplegarMenu);

    document.querySelector(".carrito").addEventListener("click", QuitarDestino);


    ticket = JSON.parse(localStorage.getItem("ticketStorage")) || []; //Esto me dice que si no puede json parsear por si esta nulo, ticket = []

    CarritoVacio();

    InsertarCarritoHTML();

    document.querySelector(".confirm-box").addEventListener("click", CompraExitosa);

})

//Funciones

function CarritoVacio() {
    if (ticket == []) {
        console.log("El carrito esta vacio");
    }
}

function CompraExitosa(e) {
    if (e.target.classList.contains("confirm")) {


        ticket = [];

        InsertarCarritoHTML();

        SalvarDatos();

        $(".confirm-feed").slideToggle("slow");

        setTimeout(() => {

            $(".confirm-feed").slideToggle("slow");

        }, 2000);

    }
}

function DesplegarMenu(e) {
    if (e.target.classList.contains("btnsites")) {

        if ($(".ticket-dropdown").attr("style", "display: none")) {

            $(".ticket-dropdown").slideToggle("slow");
        }

        buttonvalue = e.target.value;

        destinoValue = stockDestinos[buttonvalue - 1];

        $(".ticket-feed").html("<h3>¡¡Tu viaje a " + destinoValue.nombre + " esta casi listo!!</h3><p>Completa el siguiente formulario para generar el/los pasajes</p>");

    }
}

function DibujarMenu(destinos) {

    destinos.forEach((destinos, index) => {

        const { nombre, imagen, precio, value } = destinos;

        const divCard = document.querySelector("#sites");
        divCard.innerHTML += `
        <span id="card-site">
            <img src="${imagen}" class="imagen-producto">
            <h3>Viaja a ${nombre}</h3>
            <p style="font-size: small; margin: 5px">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p><span>$${precio}</span></p>
            <button  id="btnsites" class="btnsites" value="${value}">Reservar</button>
        </span>
		`
    })
}

function QuitarDestino(e) {
    if (e.target.classList.contains("drop")) {

        const DocumentoId = e.target.parentElement.parentElement.firstChild.nextSibling.textContent;

        ticket = ticket.filter(producto => producto.Documento != DocumentoId);

        InsertarCarritoHTML();

        SalvarDatos();
    }
}

function Capturar() {

    txtnombre = document.getElementById("ticketname");
    nombre = txtnombre.value;

    txtapellido = document.getElementById("ticketlastname");
    apellido = txtapellido.value;

    txtdocumento = document.getElementById("nbrdocumento");
    documento = txtdocumento.value;

    txtedad = document.getElementById("nbredad");
    edad = Number(txtedad.value);

    equipajeval = document.getElementById("selec-equipaje");
    equipaje = equipajeval.value;

    claseval = document.getElementById("selec-class");
    clase = claseval.value;

    vueloval = document.getElementById("selec-vuelo");
    vuelo = vueloval.value;

    canPersonasval = document.getElementById("cantpersonas");
    canPersonas = Number(canPersonasval.value);


    return (nombre, apellido, edad, equipaje, clase, vuelo, canPersonas, documento);

}

function EnviarDatos() {

    Capturar();

    let persona = {
        "Nombre": nombre,
        "Apellido": apellido,
        "Edad": edad,
        "Destino": destinoValue.nombre,
        "Precio": destinoValue.precio * canPersonas,
        "Equipaje": equipaje,
        "Clase": clase,
        "Vuelo": vuelo,
        "CantPersonas": canPersonas,
        "Documento": documento
    };

    ticket.push(persona);

    InsertarCarritoHTML();

    SalvarDatos();

    console.table(ticket);

    Vaciar();
}

function InsertarCarritoHTML() {

    LimpiarCarrito();

    document.querySelector(".cart-placeholder").style.display = "none";

    ticket.forEach(persona => {

        //Destructoring
        const { Nombre, Apellido, Documento, Edad, Destino, Precio, Equipaje, Clase, Vuelo, CantPersonas } = persona;

        const row = "<tr><td>" + Nombre + " " + Apellido + "</td><td>" + Documento + "</td><td>" + Edad + "</td><td>" + Destino + "</td><td>" + Equipaje + "</td><td>" + Clase + "</td><td>" + Vuelo + "</td><td>" + CantPersonas + "</td><td>" + "$" + Precio + "</td><td>" + "<p class = 'drop'> x </p>" + "</td></tr>";

        document.querySelector("#lista-carrito tbody").innerHTML += row;

    })

}

function Vaciar() {
    txtnombre.value = "";
    txtapellido.value = "";
    txtedad.value = "";
    txtdocumento.value = null;
    equipajeval.value = null;
    claseval.value = null;
    vueloval.value = null;
    canPersonasval.value = null;
}

function SalvarDatos() {

    localStorage.setItem("ticketStorage", JSON.stringify(ticket));

}

function LimpiarCarrito() {

    /* document.querySelector('#lista-carrito tbody').innerHTML = ""; */

    while (document.querySelector('#lista-carrito tbody').firstChild) {

        document.querySelector('#lista-carrito tbody').removeChild(document.querySelector('#lista-carrito tbody').firstChild);
    }
}

//Scroll-Top
$("#contact").click(function() {
    $("html, body").animate({
            scrollTop: $("#formulario").offset().top
        },
        2000
    )
});

$("#start").click(function() {
    $("html, body").animate({
            scrollTop: $("#logo").offset().top
        },
        2000
    )
})
$("#cart").click(function() {
    $("html, body").animate({
            scrollTop: $(".carrito").offset().top
        },
        2000
    )
})
$("#vuelos").click(function() {
    $("html, body").animate({
            scrollTop: $(".family").offset().top
        },
        2000
    )
})
$("#acerca").click(function() {
    $("html, body").animate({
            scrollTop: $("#logo-foot").offset().top
        },
        2000
    )
})