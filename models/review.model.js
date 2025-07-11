
import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5
    },
    postedat: {
        type: Date
    }
}, { timestamps: true })

const review = mongoose.model("review", reviewSchema);