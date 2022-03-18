const { Router } = require("express");
const { populateDataPhoto, photoGetInformation } = require("../controllers/photo");

const router = Router();

router.get('/:id', populateDataPhoto);

router.get('/', photoGetInformation)

module.exports = router;