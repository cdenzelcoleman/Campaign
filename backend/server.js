import dotenv from 'dotenv';

dotenv.config();


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './utilities/db.js';
import authRoutes from './routes/auth.js';
import campaignRoutes from './routes/campaignRoutes.js';
import characterRoutes from './routes/characterRoutes.js';
import openaiRoutes from './routes/openaiRoutes.js';
import { checkToken } from './middleware/checkToken.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();


app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api/auth', authRoutes);

app.use(checkToken);

app.use('/api/campaigns', campaignRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/openai', openaiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});

export default app;