const express = require("express");
const router = express.Router();
const {
    getOffers,
    getSingleOffer,
    createOffer,
    deleteOffer,
} = require("../controllers/Offer");

router.route("/offers").get(getOffers).post(createOffer);
router.route("/offers/:id").get(getSingleOffer).delete(deleteOffer)
module.exports = router;
