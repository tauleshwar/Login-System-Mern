import express from 'express';
import cors from 'cors';
const PORT = process.env.SERVER_PORT
const app = express();
import userRoutes from './routes/userRoutes'
import { Request, Response } from 'express';

app.use(express.json())
app.use(cors());
app.get('', (req: Request, res: Response) => {
    res.send("Welcome to User Login")
})

app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})