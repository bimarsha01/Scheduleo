
import mongoose from "mongoose";

const mybooking = new mongoose.Schema({
    bookingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service"
    },
    bname: {
        type: String,
        maxlength: 60,
        minlength: 10,
        required: true
    },
    bcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    timeslots: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const BookingModel = mongoose.model("Booking", mybooking)
export default BookingModel
