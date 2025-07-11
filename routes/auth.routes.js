import express from 'express'
// import { isadmin } from '../middleware/auth.middleware.js';
import { signuphandler, signinhandler } from '../controllers/auth.controller.js';
import { verifycode } from '../email/verify.email.js';




const router = express.Router();

// router.post('/signup', signuphandler);
// router.post('/signin', signinhandler);
// router.post('/verify', verifycode);

export default router;