const express = require("express");
//mongoose helps connect mongodb
const mongoose = require("mongoose");
//prevent cross-orgin communication issue
const cors = require("cors");
//defining the port to be used
const PORT = process.env.PORT || 9000;
const app = express();

//making use of application routes/endpoints
const routes = require("./routes")

app.use(cors())

//allow data to be posted to body of request
app.use(express.json());

//connecting to mongodb using mongoose package
mongoose.connect('mongodb+srv://lili:23pizza@cluster0.iohq5.mongodb.net/caloryApp?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(success => console.log("Database connected successfully"))
    .catch(err => console.log("error connecting to database", err))

app.use("/", routes);

//running application using the pre-defined port
app.listen(PORT, () => console.log(`app is running on ${PORT}`))
