const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registrationRoutes = require('./routes/registrations');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://nordicbreak.dk',
  'http://nordicbreak.dk',
  'https://www.nordicbreak.dk',
  'http://www.nordicbreak.dk',
  'https://nbl25.onrender.com',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <- vigtigt!

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Hello from Backend');
});

app.use('/api/registrations', registrationRoutes);

// Fejl-håndtering (CORS m.m.)
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
