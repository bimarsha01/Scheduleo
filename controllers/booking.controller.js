import mongoose from "mongoose";
// import ServiceModel from '../models/services.model.js'
import ServiceModel from '../models/services.model.js'
import BookingModel from "../models/mybooking.model.js";
import { bookingValidationSchema } from "../validation/booking.validator.js";
import { CustomerModel } from "../models/users.model.js";
import { CategoryModel } from "../models/category.model.js";
import { date } from "joi";

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
        const now = new Date();

        const mybookings = await BookingModel.aggregate([
            {
                $match: { customer: customerId }
            },
            {
                $facet: {
                    pastbookings: [
                        {
                            $match: { date: { $lt: now } }
                        },
                        { $sort: { date: -1 } },
                        {
                            $lookup: {
                                from: "services",
                                localField: "serviceId",
                                foreignField: "_id",
                                as: "service"
                            }
                        },
                        { $unwind: "service" },
                        {
                            $project: {
                                date: 1,
                                time: 1,
                                description: 1,
                                occasion: 1,
                                phoneno: 1,
                                serviceName: "$service.Sname",
                                servicePrice: "$service.Amount"
                            }
                        }
                    ],
                    upcomingBooking: [
                        {
                            $match: { date: { $gte: now } }
                        },
                        { $sort: { date: 1 } },
                        {
                            $lookup: {
                                from: "services",
                                localField: "service",
                                foreignField: "_id",
                                as: "service"
                            }
                        },
                        { $unwind: "service" },
                        {
                            $project: {
                                date: 1,
                                time: 1,
                                description: 1,
                                occasion: 1,
                                phoneno: 1,
                                serviceName: "$service.Sname",
                                servicePrice: "$service.Amount"
                            }
                        }
                    ]
                }
            }
        ])
        return res.status(200).json({
            success: true,
            data: mybookings[0]
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

export const changemybooking = async (req, res, next) => {
    const customerId = req.user._id;
    const { categoryId, serviceId, date, time, description, occasion, phoneno, noofPeople } = req.body
    const { businessId } = req.params
    const { error } = await bookingValidationSchema.validateAsync(req.body);
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });

            const existingBooking = await BookingModel.findOne({
      customer: customerId,
      serviceId: serviceId,
    });

    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    const allowedfields = [

        "categoryId",
        "businessId",
        "date",
        "time",
        "description",
        "occasion",
        "phoneno",
        "noofPeople"
    ];

    const changes = {};
    for(fields in allowedfields){
        if(req.body[fields] !== undefined || req.body[field]  !=existingBooking[fields])
            changes[field] = req.body[field];
    }
    const updatebooking = await BookingModel.findOneAndUpdate({ customer: customerId, serviceId: serviceId }, {
        customer: customerId,
        service: serviceId,
        business: businessId,
        date,
        time,
        description,
        occasion,
        phoneno,
        noofPeople
    },
        { new: true }
    )
}