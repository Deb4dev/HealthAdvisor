import express from 'express';


import genrouter from './routes/generate.route.js';

import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', genrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
 });


