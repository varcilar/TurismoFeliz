const { Router } = require("express");
const router = Router();

const { GetUser, postUser, GetUserByEmail, updateUser, deleteUser} = require("../Controllers/user.controller");

router.get("/users", GetUser);
router.post("/users", postUser);
router.get("/users/correo", GetUserByEmail);
router.patch("/users/id", updateUser);
router.delete("/users/id", deleteUser);


module.exports = router;
