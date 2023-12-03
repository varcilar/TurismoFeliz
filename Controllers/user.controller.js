const pool = require("../Model/bd.js");

//carga todos los usuario
const GetUser = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT id, nombres, apellidos, celular, correo, password FROM public.create_user"
    );
    res.status(200).send(response.rows);
    //console.log(response.rows);
    //res.send("usuario");
  } catch (err) {
    res
      .status(500)
      .send({
        sucess: false,
        message: "Error en user.controller/GetUser " + err.message,
      });
  }
};

const postUser = async (req, res) => {
  try {
    const { UserData } = req.body;
    console.log(UserData);

    const response = await pool.query(
      "INSERT INTO public.create_user(nombres, apellidos, celular, correo, password) VALUES ($1, $2, $3, $4, $5);",
      [
        UserData.nombres,
        UserData.apellidos,
        UserData.celular,
        UserData.correo,
        UserData.password,
      ]
    );
    const rpta = await pool.query(
      "SELECT id, nombres, apellidos, celular, correo, password FROM public.create_user WHERE id ASC"
    );
    res.send({ success: true, message: "OK", data: rpta.rows });
  } catch (err) {
    res
      .status(500)
      .send({
        success: false,
        message: "Error: user.controller/postUser - " + err.message,
        data: null,
      });
  }
};

const GetUserByEmail = async (req, res) => {
  try {
    const { correo } = req.body;

    // Verificar si el usuario existe
    const userResponse = await pool.query(
      "SELECT id, nombres, apellidos, celular, correo, password FROM public.create_user WHERE correo = $1",
      [correo]
    );

    if (userResponse.rows.length === 1) {
      const user = userResponse.rows[0];

      // Si el usuario existe, puedes devolver los datos o realizar otras acciones
      res.status(200).send({
        success: true,
        message: "Usuario encontrado",
        data: {
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          celular: user.celular,
          correo: user.correo,
          password: user.password
        },
      });

      console.log("Usuario encontrado:", user);
    } else {
      res.status(200).send({
        success: false,
        message: "Usuario no encontrado",
      });

      console.log("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error en GetUserByEmail:", error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

//actualiza el usuario
const updateUser = async (req, res) => {
  try {
    const { id, nombres, apellidos, celular, correo, password } = req.body;
    console.log(req.body);

    const response = await pool.query(
      "UPDATE public.create_user SET nombres=$1, apellidos=$2, celular=$3, correo=$4, password=$5 WHERE id=$6",
      [nombres, apellidos, celular, correo, password, id]
    );

    const rpta = await pool.query(
      "SELECT id, nombres, apellidos, celular, correo, password FROM public.create_user WHERE id =$1",
      [id]
    );

    console.log(rpta.rows);
    res.send({ success: true, message: "ok", data: rpta.rows });
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      message: "Error: usuarios.controller/updateUser" + " " + err.message,
      data: null,
    });
  }
}


//Permite la eliminacion de un usuario
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(
    "SELECT id, nombres, apellidos, celular, correo, password FROM public.create_user where id= $1 order by id asc",
    [id]
  );
  if (response.rows.length === 1) {
    try {
      const response = await pool.query(
        "DELETE FROM public.create_user WHERE id= $1",
        [id]
      );
      res.status(200).send("Datos eliminado");
    } catch (err) {
      res.status(500).send("Error al borrar");
    }
  } else {
    res.status(200).send("datos no existente para eliminar");
  }
};

module.exports = {
  GetUser,
  postUser,
  GetUserByEmail,
  updateUser,
  deleteUser,
};
