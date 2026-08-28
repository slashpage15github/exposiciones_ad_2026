// 1. Simulación de la base de datos con un usuario registrado
const usuarioRegistrado = {
    email: "estudiante@uadec.edu.mx",
    passwordSecreto: "Secreto123*" 
};

// 2. Seleccionamos los elementos del HTML
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const botonLogin = document.getElementById("btnLogin");
const cajaResultado = document.getElementById("resultado");

// 3. Función de flecha para validar las reglas de seguridad de la contraseña
const validarReglasPassword = (password) => {
    const tieneLongitud = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[\W_]/.test(password);

    return tieneLongitud && tieneMayuscula && tieneNumero && tieneEspecial;
};

// 4. Función de flecha principal que maneja el evento del botón
botonLogin.addEventListener("click", () => {
    const emailIngresado = inputEmail.value.trim();
    const passwordIngresada = inputPassword.value.trim();

    // Limpiamos clases previas
    cajaResultado.className = "";

    // Validación 1: Correo incorrecto
    if (emailIngresado !== usuarioRegistrado.email) {
        cajaResultado.textContent = "Error: Usuario no encontrado.";
        cajaResultado.classList.add("error");
        return;
    }

    // Validación 2: Reglas de seguridad de la contraseña
    if (!validarReglasPassword(passwordIngresada)) {
        cajaResultado.textContent = "Error: La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
        cajaResultado.classList.add("error");
        return;
    }

    // Validación 3: Contraseña incorrecta
    if (passwordIngresada !== usuarioRegistrado.passwordSecreto) {
        cajaResultado.textContent = "Error: Contraseña incorrecta.";
        cajaResultado.classList.add("error");
        return;
    }

    // Si todo es correcto
    cajaResultado.textContent = "¡Acceso concedido con éxito! Bienvenido al sistema.";
    cajaResultado.classList.add("exito");
});