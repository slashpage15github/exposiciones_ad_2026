const paginas = [
    "carlo",
    "muestra"
];

const rutaActual = window.location.pathname;
const esMenu = rutaActual.endsWith("menu.html");

if (esMenu) {
    const contenedor = document.getElementById("paginas");

    paginas.forEach(pagina => {
        const boton = document.createElement("button");

        boton.textContent = pagina;

        boton.onclick = () => {
            window.location.href = `paginas/${pagina}.html`;
        };

        contenedor.appendChild(boton);

        const saltoLinea = document.createElement("br");
        contenedor.appendChild(saltoLinea);
    });
} else {
    const botonRegresar = document.createElement("button");

    botonRegresar.textContent = "Regresar al menú";

    botonRegresar.onclick = () => {
        window.location.href = "../menu.html";
    };

    document.body.prepend(botonRegresar);

    const saltoLinea = document.createElement("br");
    botonRegresar.after(saltoLinea);
}


