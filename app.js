const express = require("express");
const route = require("./route/route");

const app = express();
route(app);

app.set("view engine","ejs");

app.use("/public",express.static("public"));

app.listen(8080,"127.0.0.1",()=> {
    console.log("server is runing... http://127.0.0.1:8080");
});
