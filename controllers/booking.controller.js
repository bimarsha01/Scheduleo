import mongoose from "mongoose";
// import ServiceModel from '../models/services.model.js'
import ServiceModel from '../models/services.model.js'
import BookingModel from "../models/mybooking.model.js";
import { CustomerModel } from "../models/users.model.js";
import { CategoryModel } from "../models/category.model.js";

export const create = async (req, res, next) => {
    const customerId = req.user._id;
    const { categoryId, serviceId, date, time, description, occasion, phoneno } = req.body
    const { businessId } = req.params;



    const service = await ServiceModel.findById({ serviceId }).populate(businessId).populate(categoryId)

    const createBooking = await BookingModel.create({
        customer: customerId,
        service: serviceId,
        business: businessId,
        date,
        time,
        description,
        occasion,
        phoneno
    })
}