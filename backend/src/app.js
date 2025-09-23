import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import teamRoutes from './routes/teamRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is healthy' });
})

app.use('/api/teams', teamRoutes);
app.use('/api/fixtures', matchRoutes);
app.use('/api/matches', eventRoutes);

export default app;