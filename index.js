require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/users.routes');
const errorHandler = require('./middlewares/error-handler.middleware');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 6000;
const app = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// Custom middlewares
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));