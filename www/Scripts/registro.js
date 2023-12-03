$(document).ready(function () {
  postUser();
});

//variables
let ideliminacion = 0;
let user = {
  id: 0,
  nombres: "",
  apellidos: "",
  celular: 0,
  correo: "",
  password: 0,
};

const getUserUrl = new URL("http://localhost:7070/users");

// Obtener datos de usuario
async function postUser() {
  try {
    const response = await fetch(getUserUrl); // Cambia la URL según sea necesario
    if (response.ok) {
      return await response.json();
    } else {
      console.error(
        "Error en la respuesta de la API:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return null;
  }
}

// Enviar datos de usuario al servidor
async function postUserToServer(user) {
  try {
    const response = await fetch(getUserUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserData: user }),
    });

    if (response.ok) {
      const content = await response.json();
      if (content.success === true) {
        alert("Usuario almacenado");
      } else {
        alert("No se pudo almacenar el usuario");
      }
      console.log(content);
    } else {
      console.error(
        "Error en la respuesta de la API:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
}

// Evento de clic en el botón
$("#btnCrearCta").on("click", async function () {
  let validar = true;
  let campo = "";
  // Obtener datos del usuario
  user.nombres = $("#txtNombres").val();
  user.apellidos = $("#txtApellidos").val();
  user.celular = parseInt($("#txtCelular").val());
  user.correo = $("#txtCorreo").val();
  user.password = parseInt($("#txtPassword").val());

  // Validaciones de campos ...

  if (user.nombres === null || user.nombres.trim() === "") {
    validar = false;
    campo += "Nombres ";
  }

  if (user.apellidos === null || user.apellidos.trim() === "") {
    validar = false;
    campo += "Apellidos ";
  }

  if (user.correo === null || user.correo.trim() === "") {
    validar = false;
    campo += "Correo ";
  }

  if (user.celular === null || isNaN(user.celular)) {
    validar = false;
    campo += "Celular ";
  }

  if (user.password === null || isNaN(user.password)) {
    validar = false;
    campo += "Contraseña ";
  }

  if (!validar) {
    //alert("Por favor, completa los siguientes campos: " + campo);
    $("#miModalDatos").modal("show");
    return;
  }


  // Enviar datos del usuario al servidor
  await postUserToServer(user);
  $("#miModalRegistro").modal("show");
  // Restablecer los valores de los campos
  $("#txtNombres").val("");
  $("#txtApellidos").val("");
  $("#txtCelular").val("");
  $("#txtCorreo").val("");
  $("#txtPassword").val("");

  window.location.href = "inicio.html";
});

$("#btnBorrarDatos").on("click", async function () {
  $("#txtNombres").val("");
  $("#txtApellidos").val("");
  $("#txtCelular").val("");
  $("#txtCorreo").val("");
  $("#txtPassword").val("");
});
