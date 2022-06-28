const express = require("express");
const connectDB = require('./config/db')
const cors = require('cors');


const app = express();

// Connect to Database
connectDB();



app.use(express.json({ extended: false }));


app.use(cors({
    origin: "*"
}))
// Default Routes
    
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
