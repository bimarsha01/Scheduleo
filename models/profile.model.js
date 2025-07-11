import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter an appropriate Name"],
        unique: true,
        minlength: 3,
        maxlength: 140,
    },
    preference: {
        Notification: {
            sms: true,
            Inapp: true
        },
        language: 'en',
        theme: {
            type: String,
            enum: ["default system", "light", "dark"],
            default: "light"
        },
        favorites: {
            type: String,
            isfavorite: boolean,
            default: null
        },
        CustomerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        bhistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }


    }
})
const profile = mongoose.model("profile", ProfileSchema);