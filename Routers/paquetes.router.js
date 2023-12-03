const { Router } = require("express");
const router = Router();

const {GetPaquetes , postPaquetes , deletePaquetes ,patchPaquetes}  = require("../Controllers/paquetes.controller");

router.get("/paquetes"    , GetPaquetes);
router.post("/paquetes"   , postPaquetes);
router.delete("/paquetes" , deletePaquetes);
router.patch("/paquetes" ,  patchPaquetes);

module.exports= router;
