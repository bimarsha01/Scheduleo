import BookingModel from "../models/mybooking.model";

export const createBooking = async (req, res, next) => {
    try {
        const { serviceId, date, timeslots, status } = req.body;
        const customerId = req.user._id;

        const createBooking = await BookingModel.create({
            customer: customerId,
            service: serviceId,
            date,
            timeslots,
            status
        })
        return res.status(201).json({
            success: true,
            message: "Booking has been done,following info below",
            createBooking
        })
    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message
        })
    }
}

export const showMyBookings = async (req, res, next) => {
    try {
        const customer = req.user._id;

        const showBookings = await BookingModel.find({ customer: customer }).populate("service");

        if (!showBookings || showBookings.length == 0)
            return res.status(403).json({
                success: false,
                message: "Could not find the Customer. Try again later"
            })

        return res.status(201).json({
            success: true,
            message: `${req.user.name}'s Booking`,
            showBookings
        })
    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message
        })
    }
}


export const editBooking = async (req, res, next) => {
    const { bookingId } = req.params;
    const customer = req.user._id;
    const updates = req.body
    try {
        const editBooking = await BookingModel.findByIdAndUpdate({ booking: bookingId, customer: customer }, updates,
            {
                new: true,
                runValidators: true
            });

        if (!editBooking)
            return res.status(401).json({
                success: false,
                message: "Could not find the booking"
            })

        return res.status(201).json({
            success: true,
            message: "Booking edited",
            editBooking
        })
    } catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message
        })
    }
}