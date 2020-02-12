const Mongoose = require("mongoose");

module.exports = function(app) {
  const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
  });

  app.post("/persons", async (request, response) => {
    try {
      var person = new PersonModel(request.body);
      var result = await person.save();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/persons", async (request, response) => {
    try {
      var result = await PersonModel.find().exec();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/persons/:id", async (request, response) => {
    try {
      var person = await PersonModel.findById(request.params.id).exec();
      response.send(person);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.put("/persons/:id", async (request, response) => {
    try {
      var person = await PersonModel.findById(request.params.id).exec();
      person.set(request.body);
      var result = await person.save();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  app.delete("/persons/:id", async (request, response) => {
    try {
      var result = await PersonModel.deleteOne({
        _id: request.params.id
      }).exec();
      response.send(result);
    } catch (error) {
      response.status(500).send(error);
    }
  });
};
