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
        category: {
            type: String,
            enum: ['Restro', 'Hotel', 'clinic', 'salon'],
            required: true,
            default: null
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
        }
    }
)
export const BusinessProfileModel = mongoose.model("Business", BusinessProfileSchema)