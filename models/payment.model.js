
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    BookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    },
    amount: {
        type: number,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ["esewa", "khalti", "paypal", "G-Pay"],
        default: null
    },
    transactionId: {
        type:String
    },
    transactedAt: {
        type: Date
    }

}, { timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema);