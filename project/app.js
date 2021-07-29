const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 9000;
const app = express();

const routes = require("./routes")

app.use(cors())
app.use(express.json());

mongoose.connect('mongodb+srv://lili:23pizza@cluster0.iohq5.mongodb.net/caloryApp?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(success => console.log("Database connected successfully"))
    .catch(err => console.log("error connecting to database", err))

app.use("/", routes);

app.listen(PORT, () => console.log(`app is running on ${PORT}`))
