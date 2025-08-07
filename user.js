const express = require("express")
const router = express.Router();
const codecontroller = require("../controllers/data.js");

router.get("/code",codecontroller.showForm);
router.post("/code",codecontroller.getEncryptedData);

router.get("/info",codecontroller.showInfo);
router.post("/info",codecontroller.getInfo);



module.exports = router;