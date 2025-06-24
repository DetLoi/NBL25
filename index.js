const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registrationRoutes = require('./routes/registrations');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.get('/', (req, res) => {
    res.send("Hello from Backend");
});

app.use('/api/registrations', registrationRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});