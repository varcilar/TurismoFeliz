$(document).ready(function () {
  GetUser();
});

// Variables
let ideliminacion = 0;
let usuarios = {
  id:0,
  apellidos: "",
  celular: 0,
  correo: "",
  password: 0,
};

const url = new URL("http://localhost:7070/users");

async function GetUser() {
  try {
    const respuesta = await fetch(url);
    if (respuesta.ok) {
      usuarios = await respuesta.json();
    } else {
      console.error(
        "Error en la respuesta de la API:",
        respuesta.status,
        respuesta.statusText
      );
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

$("#btnGrabarCta").on("click", function () {
  let validar = true;
  let campo = "";
  usuarios.correo = $("#txtCorreo").val();
  usuarios.password = $("#txtPassword").val();
debugger;
  // Validar si los campos están llenos
  if (usuarios.correo === null || usuarios.correo.trim() === "") {
    validar = false;
    campo += "Correo ";
  }

  if (usuarios.password === null || usuarios.password.trim() === "") {
    validar = false;
    campo += "Contraseña";
  }

  if (!validar) {
    //alert("Por favor, completa los siguientes campos: " + campo);
    $("#miModalDatos").modal("show");
    return;
  }

  // Ahora puedes realizar la comparación con los usuarios obtenidos
  const usuarioRegistrado = usuarios.find(
    (user) =>
    user.correo   === usuarios.correo &&
    user.password === parseInt(usuarios.password)
    );

  if (usuarioRegistrado) {
    //alert("Usuario ingresa");
    $("#miModalRegistro").modal("show");
    window.location.href = "../View/inicio.html";
    // Borrar los campos de texto
    $("#txtCorreo").val("");
    $("#txtPassword").val("");
  } else {

    alert("El Usuario no se encuentra registrado registrado");
    $("#miModal").modal("show");
    $("#txtCorreo").val("");
    $("#txtPassword").val("");
  }

  if (usuarioRegistrado) {
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));
  }
});

