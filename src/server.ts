import express, { Request, Response } from 'express';
import router from './routes/router.js';
import { connectDB, syncModels } from './config/database.js';
import { seedDatabase } from './config/seed.js';

const app = express();
const PORT = 3006;

async function initializeApp() {
  await syncModels();
  await seedDatabase();
  // 4. Start Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
app.use(express.json());
app.get('/', (req: Request, res: Response) => {

  res.status(200).json({
    message: 'Welcome to the NexBuy API. Database is connected.',
  });
});

app.use('/api', router);
connectDB().then(() => initializeApp());