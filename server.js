const express = require('express');
const cors = require('cors');
const assert = require('assert');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('express-async-errors')
const path = require('path')

// express
const app = express()
const PORT = process.env.PORT || 7000;
const connectDB = require('./db')

// route
const authRoute = require('./route/authRoute')

// configuration
app.use(cors());
app.use(cookieParser(process.env.REF_TOKEN_SECRET));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/v1/auth`, authRoute)

__dirname = path.resolve();

if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static('client/build'));

    app.use('*', (req, res) => {
        res.sendFile(path.join(_dirname + `/client/build/index.html`))
    })
}

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`server is listening on port http://localhost:${PORT}`)
        })
    } catch (err) {
        throw err;
    }
}

start()