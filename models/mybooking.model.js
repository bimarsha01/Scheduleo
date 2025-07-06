import { date, string } from "joi";
import mongoose from "mongoose";

const mybooking = new mongoose.Schema({
    bookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    bname: {
        type: string,
        maxlength: 60,
        minlength: 10,
        required: true
    },
    bcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: string,
        enum: ["pending", "confirmed", "cancelled"]
    }
},
    { timestamps: true }
)

const BookingModel = mongoose.model("Booking", mybooking)
export default BookingModel
