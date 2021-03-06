const express = require('express');
const viewRoute = require("./routes/view");
const apiRoute = require("./routes/api")


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))
app.use(viewRoute)
app.use(apiRoute)


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
