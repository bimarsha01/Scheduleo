
import { changemybooking, createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post('/mybooking/create', createBooking);
router.post('/myboooking/update',changemybooking)
// export default router;