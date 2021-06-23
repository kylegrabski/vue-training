const mongoose = require("mongoose");

// Connect to the db before tests run
before(function (done) {
  // Connect to mongodb
  mongoose.connect("mongodb://localhost/testingdb");
  mongoose.connection
    .once("open", function() {
      console.log("Connection has been made")
      done()
    })
    .on("error", function (error) {
      console.log("Connection error", error);
    });
});

// Drop the Characters collection before each test
beforeEach(function(done){
  // Drop the collection
  mongoose.connection.collections.mariochars.drop(function(){
    done();
  });
});
