// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, db) {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  //findOneAndUpdate
  // db.collection("Todos").findOneAndUpdate({_id : new ObjectID("59eaac50b598298836fd86fd")}, {$set: {completed: true}}, {returnOriginal: false}).then((result) => {
  //   console.log(result);
  // });
  // db.collection("Todos").findOneAndUpdate({_id : new ObjectID("59ebdbc5b598298836fdce6a")}, {$set: {completed: true}}, {returnOriginal: false}).then((result) => {
  //   console.log(result);
  // });


  db.collection("Users").findOneAndUpdate({
    _id: new ObjectID("59ebecbeb598298836fdd182")
  }, {
    $set: {
      name: "Ruby"
    },
    $inc: {
      age: 3
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
