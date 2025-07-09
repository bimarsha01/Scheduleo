import BusinessProfileModel from '../models/BusinessProfile.model.js'
import ServiceModel from '../models/services.model.js'
import BookingModel from '../models/mybooking.model.js'


export const createBooking = async (req, res, next) => {
    try {
        const { businessId, serviceId, timeslots, date, status, taxAndShippingFee = 0, noOfPeople } = req.body;
        const customerId = req.user._id;

        const business = await BusinessProfileModel.findById(businessId);
        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found" });
        }

        let data = {
            business: businessId,
            customer: customerId,
            timeslots,
            date,
            status,
        };

        let subtotal = 0;

        if (business.type === "salon" || business.type === "clinic") {
            if (!serviceId) {
                return res.status(400).json({ success: false, message: "Service is required" });
            }

            const service = await ServiceModel.findById(serviceId);
            if (!service) {
                return res.status(404).json({ success: false, message: "Service not found" });
            }

            subtotal = service.Amount;
            data.service = serviceId;
        }

        if (business.type === "Resturant") {
            if (!noOfPeople || noOfPeople <= 0) {
                return res.status(400).json({ success: false, message: "No of people is required" });
            }

            subtotal = business.baserate * noOfPeople;
            data.noOfPeople = noOfPeople;
        }

        const total = subtotal + taxAndShippingFee;
        data.totalAmount = total;

        const newBooking = await BookingModel.create(data);

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            newBooking
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong: ${err.message}`
        });
    }
}



// const service = await ServiceModel.findById(serviceId).populate(Businessid);





// and then go to service.working and check the time ? 