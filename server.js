const express = require('express');
require('dotenv').config()
const app = express();

const cors = require("cors")
app.use(cors())

const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectDB = require("./db/connect")
const  announcementRoute  = require('./Routes/routers');
const emailRoute = require('./Routes/email.router')

app.use("/announcements", announcementRoute)
app.use("/email", emailRoute);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to DB");
        
        app.listen(port, console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
