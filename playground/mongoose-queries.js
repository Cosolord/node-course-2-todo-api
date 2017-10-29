const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59f54fc75c32f27dd41cf25b11';
// if(!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos' , todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo' , todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log("ID not found");
//   }
//   console.log("Todo by ID", todo);
// }).catch((e) => console.log(e));

var userID = '59f5598ee43ac7e7fe14dc8c';
if(!ObjectID.isValid(userID)){
  console.log("ID not valid");
}
User.find({}).then((users) => {
  console.log("All Users: ", users);
});

User.findOne({_id: userID}).then((user) => {
  console.log("User (findOne): ", user);
});

User.findById(userID).then((user) => {
  if(!user){
    return  console.log("User not found");
  }
  console.log("User by ID: ", user);
}, (e) => {
  console.log(e);
});
