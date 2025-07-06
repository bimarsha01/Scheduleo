import { number, required, string } from "joi";
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
        type: string,
        required: true,
        enum: ["esewa", "khalti", "paypal", "G-Pay"],
        default: null
    },
    transactionId: {
        type: string
    },
    transactedAt: {
        type: Date
    }

}, { timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema);