import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Cerrouter from './Routes/certificates.routes.js';
import router from './Routes/user.routes.js';

dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: "POST, GET, DELETE, PATCH, HEAD, PUT",
}));

app.use(express.json({ limit: "100kb" }));

app.use(express.urlencoded({
  extended: true,
  limit: "1mb",
}));

app.use(express.static("/public"));

// Use routes
app.use("/api/v1/user", router);
app.use('/api/v1/certificates', Cerrouter);

// Admin
app.use("/api/v1/bytesminders" , router )

export { app };
