const express = require('express');
require('dotenv').config()
const app = express();

const cors = require("cors")
app.use(cors())

const port = process.env.port || 3000;
app.use(express.json())

const connectDB = require("./db/connect")
const  announcementRoute  = require('./Routes/routers');
app.use("/announcements", announcementRoute)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()