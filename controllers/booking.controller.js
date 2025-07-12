import mongoose from "mongoose";
// import ServiceModel from '../models/services.model.js'
import ServiceModel from '../models/services.model.js'
import BookingModel from "../models/mybooking.model.js";
import { bookingValidationSchema } from "../validation/booking.validator.js";
import { CustomerModel } from "../models/users.model.js";
import { CategoryModel } from "../models/category.model.js";

export const create = async (req, res, next) => {
    try {
        const { error } = bookingValidationSchema.validate(req.body);
        if (error)
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        const customerId = req.user._id;
        const { categoryId, serviceId, date, time, description, occasion, phoneno, noofPeople } = req.body
        const { businessId } = req.params;

        const service = await ServiceModel.findById(serviceId).populate("BusinessId").populate("categoryId")

        const closingday = service.BusinessId.closing.toLowerCase();
        const bookingdate = new Date(date);
        const bookingday = bookingdate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

        if (bookingday !== 'none' && bookingday == closingday)
            return res.status(402).json({
                success: false,
                message: `${service.BusinessId.businessName} is closed on ${service.BusinessId.closing.toLowerCase()}`
            })


        const alreadybooked = await BookingModel.findOne({
            customer: customerId,
            service: serviceId,
            date,
            timeslots
        })
        if (alreadybooked)
            return res.status(403).json({
                success: false,
                message: "Booking is already done go to showmybookings to confirm"
            });
        const createBooking = await BookingModel.create({
            customer: customerId,
            service: serviceId,
            business: businessId,
            date,
            time,
            description,
            occasion,
            phoneno,
            noofPeople
        })

        return res.status(200).json({
            success: true,
            message: "Booking done succcessfully",
            data: {
                createBooking
            }
        })


    } catch (err) {
        return res.status(502).json({
            success: false,
            message: err.message
        })
    }
}

export const showmybookings = async (req, res, next) => {
    try {
        const customerId = req.user._id;

        const mybookings = await BookingModel.find({ customer: customerId });
        if (!mybookings)
            return res.status(401).json({
                success: false,
                message: "not valid"
            })

        return res.status(200).json({
            success: true,
            message: "here is the booking",
            data: {
                mybookings
            }
        })
    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message
        })
    }
}