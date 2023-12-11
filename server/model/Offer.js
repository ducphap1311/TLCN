const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide name"],
        },
        phone: {
            type: String,
            required: [true, "Please provide phone number"]
        },
        productName: {
            type: String,
            required: [true, "Please provide product name"]
        },
        sizes: {
            type: Array,
            required: [true, "Please provide sizes"]
        },
        totalAmount: {
            type: Number,
            required: [true, 'please provide amount products']
        },
        price: {
            type: Number,
            required: [true, "Please provide price"]
        },
        images: {
            type: Array,
            required: [true, "Please provide images"]
        },
        description: {
            type: String,
            required: [true, "Please provide description"]
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema)
