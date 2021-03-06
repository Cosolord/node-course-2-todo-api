var express     = require('express'),
    bodyParser  = require('body-parser'),
    {ObjectID}  = require('mongodb'),
    _           = require('lodash');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
var {authenticate} = require('./middleware/authenticate');

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

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id,
    body = _.pick(req.body, ["text", "completed"]);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });

});

app.get("/users", (req, res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send();
  });
});


app.post("/users", function(req, res) {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header("x-auth", token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server started at port: ${port} at time: ${Date.now()}`);
});

module.exports = {app};
