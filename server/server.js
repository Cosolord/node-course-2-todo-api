var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos : todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get("/todos/:id", function(req, res) {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((foundTodo) => {
    if(!foundTodo){
      res.status(404).send();
    }
    res.send({foundTodo});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todoToRemove) => {
    if(!todoToRemove){
      res.status(404).send();
    }
    res.status(200).send(todoToRemove);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server started at port: ${port} at time: ${Date.now()}`);
});

module.exports = {app};
