import { required, string } from "joi";
import mongoose from "mongoose";

const category = new mongoose.Schema(
    {

        name: {
            type: string,
            unique: true,
            required: true
        },
        description: {
            type: string,
            maxlength: 200,
            minlength: 20,
            required: true
        },
        visibleToCustomers: {
            type: Boolean,
            default: true
        },
        Business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        }
    })
export const CategoryModel = mongoose.model("Category", category)