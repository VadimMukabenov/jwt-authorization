import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './server/routes/users.routes';
import errorHandler from './server/middlewares/error-handler.middleware';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 6000;
const app = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// Custom middlewares
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
