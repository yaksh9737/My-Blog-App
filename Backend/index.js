const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connect = require("./Config/db");
const app = express();
const PORT = process.env.PORT || 7890;

const cookieParser = require('cookie-parser');
const blogRoute = require("./Routes/blogRoute");

app.use(cookieParser());
dotenv.config();

app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog Personal App API');
});

// Blog routes
app.use("/BlogPersonalApp/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
});
