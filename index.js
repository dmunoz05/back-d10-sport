import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from './src/routes/routes.js';
import getConnection from './src/database/connection.mysql.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const corsOptions = {
    origin: "*",
    methods: ["POST", "GET", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/d10/server/v1', routes());


//Conect database
const connDb = await getConnection();
if (!connDb) {
    console.log("\n*****************************");
    console.log("Error connecting to database");
    console.log("*****************************\n");
}
else {
    console.log("\n*****************************");
    console.log("Connected to database");
    console.log("*****************************\n");
}

// API Working
app.get('/', (req, res) => {
    res.json('Working');
})

app.listen(PORT, () => {
    console.log("*****************************");
    console.log(`Server listen on http://localhost:${PORT}/d10/server/v1`);
    console.log("*****************************\n");
});
