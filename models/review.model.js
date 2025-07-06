import { string } from "joi";
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
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true,
        maxlength: 100,
        minlength: 5
    },
    postedat: {
        type: Date
    }
}, { timestamps: true })

const review = mongoose.model("review", reviewSchema);