$(document).ready(function () {
  GetPaquetes();
});


let paquetes = {
  idpaquete: 0,
  nombre: "",
  precio: 0,
  descripcion: "",
  imagen: "",
};

let info;
const url = new URL("http://localhost:7070/paquetes");
async function GetPaquetes() {
  const paquetes = await fetch(url);
  const respuestadepaquetes = await paquetes.json();
  ViewPaquetes(respuestadepaquetes);
};


$("#btnGrabarCta").on("click", function () {
  debugger;
  let validar = true;
  let campo = "";
  paquetes.nombre = $("#textnombre").val();
  paquetes.precio = parseInt($("#textPrecio").val());
  paquetes.descripcion = $("#textDescripcion").val();

  if (paquetes.nombre === null || paquetes.nombre.trim() === "") {
    validar = false;
    campo += "nombre ";
  }
  
  if (paquetes.precio === null || isNaN(paquetes.precio)) {
    validar = false;
    campo += "precio ";
  }
  
  if (paquetes.descripcion === null || paquetes.descripcion.trim() === "") {
    validar = false;
    campo += "descripcion ";
  }
debugger;
  if (validar === true) {
    (async () => {
      debugger;
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Paquetes: paquetes }),
      });
      const content = await rawResponse.json();
      if (content.sucess === true) {
        ViewPaquetes(content.data);
        $("#exampleModal").modal("hide");
        debugger;
        alert("Paquete almacenado");
        limpiar();
      } else {
        alert("no pudo ser almacenado el paquete");
        limpiar();
      }

      console.log(content);
    })();
  } else {
    alert(
      "hay un campo vacio no se puede continuar llene los campos, " + campo);
  }
});

function deleteCat(idpaquete) {
  $("#miModal").modal("show");
  ideliminacion = idpaquete;
}

debugger;
$("#btnCnfEliminar").on('click', function () {
  alert("eliminado " + ideliminacion);
  $('#miModal').modal('hide');

  if (ideliminacion > 0) {
      debugger;
      (async () => {
          try {
              const rawResponse = await fetch(url, {
                  method: 'DELETE',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ idelim: ideliminacion })
              });
              debugger;
              const content = await rawResponse.json();
              debugger;
              if (content.sucess === true) {
                  ViewPaquetes(content.data);
                  alert("Paquete eliminado");
                  debugger;
              } else {
                  alert("No se pudo eliminar el paquete");
              }
          } catch (error) {
              console.error('Error during DELETE request:', error);
              alert('Error al eliminar el paquete. Consulta la consola para más detalles.');
          }
      })();
  } else {
      debugger;
      alert("registro no seleccionado para borrar");
  }
});

function putCat(id) {
  debugger;
 
  let reg = info;
  let res= reg.filter(function (info) { return info.idpaquete ==id});
  debugger;
  $("#textnombreEdit").val(res[0].nombre);
  $("#textDescripcionEdit").val(res[0].descripcion);
  $("#textPrecioEdit").val(res[0].precio);

  $("#exampleModalModificar").modal("show");
 
}

debugger;
$("#btnModificar").on('click', async function () {
  try {
    const paquetes = {
      nombre: $("#textnombreEdit").val(),
      precio: parseInt($("#textPrecioEdit").val(), 10) || 0,
      descripcion: $("#textDescripcionEdit").val(),
    };
    console.log("Nombre:", paquetes.nombre);
    console.log("Precio:", paquetes.precio);

    if (!paquetes.nombre || !paquetes.nombre.trim()) {
      console.log("Nombre no válido.");
      alert("Por favor, complete el nombre correctamente.");
      return;
    }

    if (isNaN(paquetes.precio)) {
      console.log("Precio no válido.");
      alert("Por favor, ingrese un precio válido.");
      return;
    }

    const rawResponse = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Paquetes: paquetes })
    });

    const content = await rawResponse.json();

    if (content.success === true) {
      ViewPaquetes(content.data);
      $('#exampleModalModificar').modal('hide');
      alert("¡Paquete modificado con éxito!");
    } else {
      alert("No se pudo modificar el paquete. Por favor, inténtalo de nuevo.");
      limpiar();
    }

    console.log(content);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un error al modificar el paquete. Por favor, inténtalo de nuevo.");
  }
});


function limpiar() {
  $("#textnombre").val("");
  $("#textPrecio").val("");
  $("#textDescripcion").val("");

  $("#textnombreEdit").val("");
  $("#textPrecioEdit").val("");
  $("#textDescripcionEdit").val("");

  paquetes.idpaquete = 0;
  paquetes.nombre = "";
  paquetes.precio = 0;
  paquetes.descripcion = "";
  paquetes.imagen = "";
  ideliminacion = 0;
}

function ViewPaquetes(respuestadepaquetes) {
  debugger;
  info= respuestadepaquetes;
  let table = new Tabulator("#tabla", {
    layout: "fitDataStretch",
    reactiveData: false, // enable reactive data
    data: respuestadepaquetes,
    pagination: "local",
    paginationSize: "3",
    height: "auto",
    movableColumns: false,
    columns: [


        {
            title: "Editar",
            align: "center",
            formatter: function (cell, formatterParams) {
                let info =  cell.getData();
                let html = "<a href='javascript: putCat(" + info.idpaquete + ")'><img src='../Recursos/image/pen.png'></a>";
                return html;
            },
            width: 100
        },
        {
            title: "Eliminar",
            align: "center",
            formatter: function (cell, formatterParams) {
                let info = cell.getData();
                let html = "<a href='javascript: deleteCat(" + info.idpaquete + ")'><img src='../Recursos/image/bin.png'></a>";
                return html;
            },
            width: 110
        },

        { field: "idpaquete", title: "id", hozAlign: "center", sorter: "string", width: 200, headerFilter: true },
        { field: "nombre", title: "Producto", hozAlign: "center", sorter: "string", width: 200, headerFilter: true },
        { field: "precio", title: "Precio", hozAlign: "center", sorter: "string", width: 200, headerFilter: true },
        { field: "descripcion", title: "Descripción", hozAlign: "center", sorter: "string", width: 200, headerFilter: true },

        /*{
            title: "Imagen",
            hozAlign: "center",
            headerSort: false,
            formatter: function (cell, formatterParams) {
                let info = cell.getData();
                let html = "<a href='#" + 1 + "'><img style='width:100px;height:100px;' src='" + info.image + "'/></a> ";
                return html;
            }
        },*/
    ],
});
}