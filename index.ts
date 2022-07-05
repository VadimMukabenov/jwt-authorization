require('dotenv').config()
import express from 'express';
import userRouter from './src/routes/users.routes';
import errorHandler from './src/middlewares/error-handler.middleware';
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
