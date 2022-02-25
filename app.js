const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');
const pelanggaranRoutes = require('./src/routes/pelanggaran');

const Admin = require('./src/models/admin');

const app = express();
const port = process.env.port || "8000";

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/src/public/images/', express.static(path.join(__dirname, 'src', 'public', 'images')));

app.use(adminRoutes);
app.use(userRoutes);
app.use(pelanggaranRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/sigds").then(e => {
    app.listen(port, () => {
        console.log(`server running in http://localhost:${port}`)
    })
}).catch(e => console.log("error connect to database"));