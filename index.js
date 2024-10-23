import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { routes } from './src/routes/routes.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const corsOptions = {
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));
app.use('/api/', routes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
