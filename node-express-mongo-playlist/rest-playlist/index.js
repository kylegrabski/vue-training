const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// set up express app
const app = express();
const PORT = 4000;

// connect to mongodb
mongoose.connect("mongodb://localhost/testingdb");
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(bodyParser.json());


// initialize routes
app.use("/api", routes); 

// Error handling middleware
app.use(function(err, req, res, next){
	// console.log(err)
	// res.status(422).send({
	// 	error: err.message
	// })
	res.status(422).json(err)
})

// listen for requests
app.listen(process.env.port || PORT, function () {
	console.log(`Now listening at port number ${PORT}`);
});
