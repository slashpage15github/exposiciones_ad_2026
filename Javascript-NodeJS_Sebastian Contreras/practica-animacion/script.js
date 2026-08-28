const boton = document.getElementById("btnAnimar");
const caja = document.getElementById("cajaMagica");

let estadoMovido = false;

boton.addEventListener("click", () => {
    if (!estadoMovido) {
        // Si no se ha movido, lo desplazamos y cambiamos de color
        caja.style.transform = "translateX(150px) rotate(360deg) scale(1.2)";
        caja.style.backgroundColor = "#28a745";
        boton.textContent = "¡Regresar!";
        estadoMovido = true;
    } else {
        // Si ya se movió, lo regresamos a su posición original
        caja.style.transform = "translateX(0px) rotate(0deg) scale(1)";
        caja.style.backgroundColor = "#ff5722";
        boton.textContent = "¡Activar Animación!";
        estadoMovido = false;
    }
});