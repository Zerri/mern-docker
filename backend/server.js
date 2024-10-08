const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
// const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://myadmin:mypassword@mongo:27017/esempioDB?authSource=admin";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Configura il pool di connessioni per PostgreSQL
const pool = new Pool({
  user: 'pgadmin',
  host: 'postgres', // nome del servizio nel tuo docker-compose
  database: 'mydb',
  password: 'pgpassword',
  port: 5432, // porta mappata su Docker
});

// Definisci il modello Mongoose
const esempioSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  email: String
});

const Esempio = mongoose.model('Esempio', esempioSchema, 'esempioCollection');

// Aggiungi un endpoint per ottenere i documenti
app.get('/api/esempi', async (req, res) => {
  try {
    const esempi = await Esempio.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(esempi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Aggiungi un endpoint per ottenere i dati delle auto
app.get('/api/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!!');
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server in esecuzione su porta 5000');
});
