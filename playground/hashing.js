const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//USANDO crypto-js
// var message = "i am user Number 3";
// var hash = SHA256(message).toString();
//
// console.log("Message: " + message);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }
// //
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// if (resultHash === token.hash) {
//   console.log("data was not changed");
// } else {
//   console.log("data was changed!!!");
// }

//USANDO jwt
var data = {
  id: 10,
  name: "Jones"
};

var token = jwt.sign(data, '123salt');
console.log( "token: ", token);

var decoded = jwt.verify(token, '123salt');
console.log("decoded: ", decoded);
