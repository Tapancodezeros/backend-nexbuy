import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/router.js';
import { connectDB, syncModels } from './config/database.js';
import { seedDatabase } from './config/seed.js';
import { MESSAGES, HTTP_STATUS } from './constants/messages.js';

const app = express();
const PORT = 3006;

// ✅ Proper CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Frontend (React/Next.js dev)
    'https://localhost:3000', // Optional if you use HTTPS frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies or auth headers
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// ✅ JSON middleware before routes
app.use(express.json());

// ✅ Root route
app.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    message: MESSAGES.API_WELCOME,
  });
});

// ✅ API routes
app.use('/api', router);

// ✅ Initialize DB and server
async function initializeApp() {
  await syncModels();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(MESSAGES.SERVER_RUNNING(PORT));
  });
}

// ✅ Connect DB and then start
connectDB().then(() => initializeApp());
