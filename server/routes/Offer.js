const express = require("express");
const router = express.Router();
const {
    getOffers,
    getSingleOffer,
    createOffer,
    deleteOffer,
    updateOffer,
} = require("../controllers/Offer");

router.route("/offers").get(getOffers).post(createOffer);
router.route("/offers/:id").get(getSingleOffer).delete(deleteOffer).put(updateOffer)
module.exports = router;
