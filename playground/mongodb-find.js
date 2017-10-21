// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, db) {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").find({_id: new ObjectID("59ea9ea176297fbe69885284")}).toArray().then((docs) => {
  //   console.log("Todos", JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch todos");
  // });
  // db.collection("Todos").find().count().then((count) => {
  //   console.log("Todos count:", + count);
  // }, (err) => {
  //   console.log("Unable to fetch todos");
  // });

  db.collection("Users").find({name: "Tom"}).count().then((count) => {
    console.log(`Utenti trovati: ${count}`);
  }, (err) => {
    console.log("Errore");
  });
  db.collection("Users").find({name: "Tom"}).toArray().then((docs) => {
    docs.forEach((e)=>{console.log(JSON.stringify(e.name + " " + e.location))});
    console.log(JSON.stringify(docs.name, docs.location));
  }, (err) => {
    console.log("Errore");
  });

  db.close();
});
