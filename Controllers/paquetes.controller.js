const pool = require("../Model/bd.js");

const GetPaquetes = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT idpaquete, nombre, precio, descripcion, imagen FROM public.plans_user order by idpaquete ASC;"
    );
    res.status(200).send(response.rows);
  } catch (err) {
    res.status(500).send({
      sucess: false,
      message: "Error en paquetes.controller/GetPaquetes" + err.message,
    });
  }
};

const postPaquetes = async (req, res) => {
  try {
    const { Paquetes } = req.body;
    console.log(Paquetes);
    const response = pool.query(
      "INSERT INTO public.plans_user(nombre, precio, descripcion, imagen) VALUES ($1, $2, $3, $4);",
      [Paquetes.nombre, Paquetes.precio, Paquetes.descripcion, Paquetes.imagen]
    );
    const rpta = await pool.query(
      "SELECT idpaquete, nombre, precio, descripcion, imagen FROM public.plans_user order by idpaquete ASC;"
    );
    res.send({ sucess: true, message: "ok", data: rpta.rows });
  } catch (err) {
    res.send({
      sucess: false,
      message: "Error: paquetes.controller/postPaquetes " + " " + err.message,
      data: null,
    });
  }
};

const patchPaquetes = async (req, res) => {
  try {
    const { idpaquete, nombre, precio, descripcion, imagen } = req.body;

    // Usa async/await para esperar a que la actualización se complete
    const response = await pool.query(
      "UPDATE public.plans_user SET nombre=$1, precio=$2, descripcion=$3, imagen=$4 WHERE idpaquete =$5",
      [nombre, precio, descripcion, imagen, idpaquete]
    );

    // Asegúrate de esperar la ejecución de la consulta de selección también
    const rpta = await pool.query(
      "SELECT idpaquete, nombre, precio, descripcion, imagen FROM public.plans_user WHERE idpaquete = $1",
      [idpaquete]
    );

    console.log(rpta.rows);
    res.send({ success: true, message: "ok", data: rpta.rows });
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      message: "Error: paquetes.controller/patchPaquetes " + " " + err.message,
      data: null,
    });
  }
};


const deletePaquetes = async (req, res) => {
  const { idelim } = req.body;
  console.log(idelim);
  const response = await pool.query(
    "SELECT idpaquete, nombre, precio, descripcion, imagen FROM public.plans_user WHERE idpaquete =$1",
    [idelim]
  );
  if (response.rows.length === 1) {
    try {
      const rpta = await pool.query(
        "DELETE FROM public.plans_user WHERE idpaquete =$1;",
        [idelim]
      );
      const response = await pool.query(
        "SELECT idpaquete, nombre, precio, descripcion, imagen FROM public.plans_user order by idpaquete ASC;"
      );
      res
        .status(200)
        .send({ sucess: true, message: "ok", data: response.rows });
    } catch (err) {
      res
        .status(500)
        .send({ sucess: false, message: "Error: " + err.message, data: null });
    }
  } else {
    res
      .status(500)
      .send({ sucess: false, message: "registro no encontrado", data: null });
  }
};

module.exports={
    GetPaquetes,
    postPaquetes,
    patchPaquetes,
    deletePaquetes,
}