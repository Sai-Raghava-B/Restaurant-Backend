import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import reviewRoutes from './reviewRoutes.js';
import listingRoutes from './ListingRoutes.js'; 
import authRoutes from './AuthRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();


app.use('/', reviewRoutes);
app.use('/', listingRoutes); 
app.use('/', authRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
