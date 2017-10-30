const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// //Todo.remove
// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//
Todo.findOneAndRemove({_id: '59f687627fb57d97c174a3b8'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('59f687627fb57d97c174a3b8').then((todo) => {
  console.log(todo);
});
