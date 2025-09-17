const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
require('./connection.js');
const TestRoutes = require("./Routes/testRoutes.js");
const PatientRoutes = require('./Routes/patientRoutes.js');

app.use('/test',TestRoutes);
app.use('/patient',PatientRoutes);

app.listen(PORT,()=>{
    console.log("Local host is running on PORT 8000");
})