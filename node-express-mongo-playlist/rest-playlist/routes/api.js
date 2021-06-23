const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

// get a list of ninjas from the db
router.get("/ninjas", function (req, res, next) {
	// find by geolocation
	Ninja.aggregate()
		.near({
			near: {
				type: "Point",
				coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
			},
			maxDistance: 100000,
			spherical: true,
			distanceField: "dis",
		})
		.then(function (data) {
			res.send(data);
		})
		.catch(next);

	// get all
	// Ninja.find({})
	// 	.then(data => {
	// 		res.json(data);
	// 	})
	// 	.catch(next);

	// async get all
	// try {
	// 	let ninjaData = await Ninja.find({})
	// 	console.log(ninjaData)
	// 	res.json(ninjaData)
	// 	4
	// } catch(error){
	// 	console.log(error)
	// }
});

// add a new ninja to the db
router.post("/ninjas", function (req, res, next) {
	// let ninja = new Ninja(req.body);
	// ninja.save();
	// res.send({
	// 	type: "POST",
	// 	name: req.body.name,
	// 	rank: req.body.rank
	// })
	Ninja.create(req.body)
		.then(function (data) {
			res.send(data);
		})
		// next is a parameter that tells the function to move on to the next piece of middleware
		.catch(next);
});

// update a ninja in the db
router.put("/ninjas/:id", function (req, res, next) {
	Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
		Ninja.findOne({
			_id: req.params.id,
		}).then(function (data) {
			res.send(data);
		});
	});
});

// delete a ninja in the db
router.delete("/ninjas/:id", function (req, res, next) {
	Ninja.findByIdAndRemove({
		_id: req.params.id,
	}).then(function (data) {
		res.send(data);
	});
});

module.exports = router;
