import express, { Request, Response } from 'express';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import manageShopRouter from './routes/manageShopRoutes.js';

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


app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/shops', manageShopRouter);

connectDB().then(() => initializeApp());