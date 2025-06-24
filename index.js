const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registrationRoutes = require('./routes/registrations');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS fix ---
const corsOptions = {
  origin: ['https://nordicbreak.dk', 'http://nordicbreak.dk'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight support

// --- Express setup ---
app.use(express.json());

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Hello from Backend');
});

app.use('/api/registrations', registrationRoutes);

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
