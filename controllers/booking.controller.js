import BookingModel from "../models/mybooking.model";
import { BusinessProfileModel } from "../models/BusinessProfile.model";
import { CategoryModel } from "../models/category.model";
import { ServiceModel } from "../models/services.model";

export const createBooking = async (req, res, next) => {
    try {
        const { businessId, serviceId, timeslots, date, status, taxAndShippingFee } = req.body;
        const { customerId } = req.user._id;

        const business = await BusinessProfileModel.findById(businessId);

        if (!business)
            return res.status(401).json({ error: "Business not found" });
        let data = {
            business: businessId,
            customer: customerId,
            timeslots,
            date,
            status
        }
        let NoOfPeople = 0;

        const service = await ServiceModel.findById(serviceId);

        if (business.type === "salon" || business.type === "clinic") {
            if (!serviceId) {
                return res.status(400).json({ success: false, message: "Service is required" });
            }


            let subtotal = service.Amount
            let total = subtotal + taxAndShippingFee;
            data.service = serviceId;
        }
        if (business.type === "Resturant") {
            if (!NoOfPeople)
                return res.status(400).json({
                    success: false,
                    message: "No of people is required"
                })

            data.NoOfPeople = NoOfPeople
            let subtotal = business.baserate * NoOfPeople
            let total = subtotal + taxAndShippingFee;

        }
        const newBooking = await BookingModel.create(data);


        return res.status(201).json({
            success: true,
            message: "New user has been created Successfully",
            newBooking
        })
    } catch (err) {
        return res.status(501).json({
            success: false,
            message: `Something went wrong ${err}`
        })
    }

}










































// export const createBooking = async (req, res, next) => {
//     try {
//         const { serviceId, date, timeslots, status } = req.body;
//         const customerId = req.user._id;

//         const createBooking = await BookingModel.create({
//             customer: customerId,
//             service: serviceId,
//             date,
//             timeslots,
//             status
//         })
//         return res.status(201).json({
//             success: true,
//             message: "Booking has been done,following info below",
//             createBooking
//         })
//     } catch (err) {
//         return res.status(501).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// export const showMyBookings = async (req, res, next) => {
//     try {
//         const customer = req.user._id;

//         const showBookings = await BookingModel.find({ customer: customer }).populate("service");

//         if (!showBookings || showBookings.length == 0)
//             return res.status(403).json({
//                 success: false,
//                 message: "Could not find the Customer. Try again later"
//             })

//         return res.status(201).json({
//             success: true,
//             message: `${req.user.name}'s Booking`,
//             showBookings
//         })
//     } catch (err) {
//         return res.status(501).json({
//             success: false,
//             message: err.message
//         })
//     }
// }


// export const editBooking = async (req, res, next) => {
//     const { bookingId } = req.params;
//     const customer = req.user._id;
//     const updates = req.body
//     try {
//         const editBooking = await BookingModel.findByIdAndUpdate({ booking: bookingId, customer: customer }, updates,
//             {
//                 new: true,
//                 runValidators: true
//             });

//         if (!editBooking)
//             return res.status(401).json({
//                 success: false,
//                 message: "Could not find the booking"
//             })

//         return res.status(201).json({
//             success: true,
//             message: "Booking edited",
//             editBooking
//         })
//     } catch (err) {
//         return res.status(501).json({
//             success: false,
//             message: err.message
//         })
//     }
// }