import mongoose from 'mongoose'

const BusinessProfileSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
            unique: true
        },
        businessName: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 30,
        },
        services: [String],

        location: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 40,
        },
        working: {
            open: Date(),
            close: Date()
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",

        }
    }
)
export const BusinessProfileModel = mongoose.model("Business", BusinessProfileSchema)