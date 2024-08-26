const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const taskRoutes = require('./routes/taskRoutes')

require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(loggerMiddleware)
app.use('/api', userRouter);

app.use('/api',taskRoutes);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
app.get('/', (req, res) => {
    res.send({
        message: "Hello From Adarsh Singh!"
    });
});


const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Port is listening on ${port}`);
});
