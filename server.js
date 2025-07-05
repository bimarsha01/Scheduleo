import express from 'express';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dns from 'dns';
import authRoutes from './routes/auth.routes.js';
import { Console } from 'console';
// import taskRouter from './routes/task.routes.js';


dns.setServers(['8.8.8.8']); // Forces Google DNS in Node.js

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Mount auth routes at /auth
app.use('/auth', authRoutes);
// app.use('/task', taskRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {

        console.log(process.env.ORG_EMAIL);
        console.log(process.env.ORG_PASS)
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to DB:', error);
        process.exit(1);
    }
};

startServer();
