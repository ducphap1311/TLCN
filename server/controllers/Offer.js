const { NotFoundError } = require("../errors");
const Offer = require("../model/Offer");

const getSingleOffer = async (req, res) => {
    const { id: offerId } = req.params;
    const offer = await Offer.findOne({ _id: offerId });
    if (!offer) {
        throw new NotFoundError(`No offer with id ${productId}`);
    }
    res.status(200).json({ offer });
};

const getOffers = async (req, res) => {
    const offers = await Offer.find({})
    res.status(200).json({ offers });
};

const createOffer = async (req, res) => {
    const offer = await Offer.create(req.body);
    res.status(201).json({ offer });
};

const updateOffer =  async (req, res) => {
    const {id} = req.params
    const offer = await Offer.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({offer})
}
const deleteOffer = async (req, res) => {
    const { id: offerId } = req.params;
    const offer = await Offer.findOneAndDelete({ _id: offerId });
    if (!offer) {
        throw new NotFoundError(`No offer with id ${offerId}`);
    }
    res.status(201).json({ offer });
};

module.exports = {
    getSingleOffer,
    getOffers,
    createOffer,
    deleteOffer,
    updateOffer
};
