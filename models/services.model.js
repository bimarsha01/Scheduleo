import { string } from "joi";
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
    {
        Sname: {
            type: String,
            required: true
        },
        Amount: {
            type: Number,
            required: true
        },
        Sduration: {
            type: String,
            required: true,
            default: "vary"
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        BusinessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        },
        noOfPeople: {
            type: string,
            required: true,
            default: 1
        },
        Date: {
            type: Date
        },
        time: {
            type: string
        }
    },
    { timestamps: true }
);

export const ServiceModel = mongoose.model("Service", ServiceSchema);


