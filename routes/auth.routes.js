import express from 'express'
// import { isadmin } from '../middleware/auth.middleware.js';
import { Signupvalidation, Signinvalidation } from '../controllers/auth.controller.js';




const router = express.Router();

router.post('/signup', Signupvalidation);
router.post('/signin', Signinvalidation);

export default router;