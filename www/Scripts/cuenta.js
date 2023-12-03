$(document).ready(function () {
  GetUserByEmail();
  obtenerUsuarioPorCorreo();
});

// Variables
let ideliminacion = 0;
let usuario = {
  id: 0,
  nombres: "",
  apellidos: "",
  celular: 0,
  correoactual: "",
  password: 0,
};

const getUserUrl = new URL("http://localhost:7070/users");

async function GetUserByEmail() {
  try {
    const response = await fetch(getUserUrl);
    if (response.ok) {
      return await response.json();
    } else {
      console.error(
        "Error en la respuesta de la API:",
        response.status,
        response.statusText
       )}
      return null;
    } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return null;
  }
}

let usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
if (usuarioRegistrado) {
  console.log(usuarioRegistrado);
}

async function obtenerUsuarioPorCorreo() {
  try {
    const usuarioRegistrado = JSON.parse(
      localStorage.getItem("usuarioRegistrado")
    );
    if (usuarioRegistrado) {
      const userNombres = document.getElementById("userNombres");
      const userApellidos = document.getElementById("userApellidos");
      const userCelular = document.getElementById("userCelular");
      const userCorreo = document.getElementById("userCorreo");
      const userPassword = document.getElementById("userPassword");

      userNombres.innerHTML = `<p>${usuarioRegistrado.nombres}</p>`;
      userApellidos.innerHTML = `<p>${usuarioRegistrado.apellidos}</p>`;
      userCelular.innerHTML = `<p>${usuarioRegistrado.celular}</p>`;
      userCorreo.innerHTML = `<p>${usuarioRegistrado.correo}</p>`;
      userPassword.innerHTML = `<p>${usuarioRegistrado.password}</p>`;
    } else {
      console.log("El correo del usuario actual no coincide con el obtenido.");
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

debugger;

const updateUserUrl = new URL("http://localhost:7070/users/id");

debugger;
$("#btnEditar").on('click', async function () {
debugger;
$("#textNombresEdit").val(usuarioRegistrado.nombres);
$("#textApellidosEdit").val(usuarioRegistrado.apellidos);
$("#textCelularEdit").val(usuarioRegistrado.celular);
$("#textCorreoEdit").val(usuarioRegistrado.correo);
$("#textPasswordEdit").val(usuarioRegistrado.password);
debugger;

  
    usuarioRegistrado.nombres= $("#textnombreEdit").val();
    usuarioRegistrado.apellidos= $("#textApellidosEdit").val();
    usuarioRegistrado.celular= parseInt($("#textCelularEdit").val(), 10) || 0;
    usuarioRegistrado.correo= $("#textCorreoEdit").val();
    usuario.password= parseInt($("#textPasswordEdit").val(), 10) || 0;
  
  console.log("Nombres:", usuarioRegistrado.nombres);
  console.log("Apellidos:", usuarioRegistrado.apellidos);

  if (!usuarioRegistrado.nombres || !usuarioRegistrado.nombres.trim()) {
    console.log("Nombres no válido.");
    alert("Por favor, complete el nombre correctamente.");
    return;
  }

  if (!usuarioRegistrado.apellidos || !usuarioRegistrado.apellidos.trim()) {
    console.log("Apellidos no válido.");
    alert("Por favor, complete el nombre correctamente.");
    return;
  }

  if (isNaN(usuarioRegistrado.celular)) {
    console.log("Celular no válido.");
    alert("Por favor, ingrese un precio válido.");
    return;
  }
  
  if (!usuarioRegistrado.correo || !usuarioRegistrado.correo.trim()) {
    console.log("Correo no válido.");
    alert("Por favor, complete el nombre correctamente.");
    return;
  }

  if (isNaN(usuarioRegistrado.password)) {
    console.log("Password no válido.");
    alert("Por favor, ingrese un precio válido.");
    return;
  }

  debugger;
  try {
    const rawResponse = await fetch(updateUserUrl, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserData: usuarioRegistrado })
    });

    const content = await rawResponse.json();

    if (content.success === true) {
      $('#exampleModalModificar').modal('hide');
      alert("¡Usuario modificado con éxito!");
    } else {
      alert("No se pudo modificar el Usuario. Por favor, inténtalo de nuevo.");
      limpiar();
    }

    console.log(content);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un error al modificar el Usuario. Por favor, inténtalo de nuevo.");
  }
});

const deleteUserUrl = new URL("http://localhost:7070/users/id");

$("#btnEliminar").on('click', function () {
  debugger;
  ideliminacion = usuarioRegistrado.id;
  alert("eliminado " + ideliminacion);
  $('#miModal').modal('hide');
  debugger;
  if (ideliminacion > 0) {
    debugger;
    (async () => {
      try {
        const rawResponse = await fetch(deleteUserUrl, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idelim: ideliminacion })
        });

        const content = await rawResponse.text(); // Obtén la respuesta como texto

        // Revisa la respuesta antes de intentar analizarla como JSON
        console.log("Respuesta del servidor:", content);
        debugger;
        if (content.includes("datos no eliminados")) {
          alert("No se pudo eliminar el usuario");
        } else {
          alert("Usuario eliminado");
          debugger;
        }
      } catch (error) {
        console.error('Error during DELETE request:', error);
        alert('Error al eliminar el usuario. Consulta la consola para más detalles.');
      }
    })();
  } else {
    debugger;
    alert("registro no seleccionado para borrar");
  }
  limpiar();
  $("#userNombres").val("");
  $("#userApellidos").val("");
  $("#userCelular").val("");
  $("#userCorreo").val("");
  $("#userPassword").val("");

});




function limpiar() {
  $("#textNombresEdit").val("");
  $("#textApellidosEdit").val("");
  $("#textCelularEdit").val("");
  $("#textCorreoEdit").val("");
  $("#textPasswordEdit").val("");

  usuarioRegistrado.nombres = "";
  usuarioRegistrado.apellidos = "";
  usuarioRegistrado.celular = 0;
  usuarioRegistrado.correo = "";
  usuarioRegistrado.password = 0;
  ideliminacion = 0;
}
