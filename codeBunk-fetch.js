//var request = require('request');
var Promise = require("bluebird");
var request = Promise.promisify( require("request"), {multiArgs: true});

 async function getStuff(){
      return  new Promise( (resolve, reject) =>{
         request('https://jsonplaceholder.typicode.com/todos/1',  (error, response, body)=> {
           if( error ){
              return reject (new Error(error.message));
           }else if( response && response.statusCode === 200){
              return resolve(body)
           }
        });
      });
}

function* doFetch(){
 let response = yield getStuff();
 console.log('response  =', response);
}
//let tester = doFetch();

var it = doFetch();
var res = it.next();
res.value.then(data => it.next(data));
// console.log('doFetch -- ', tester.next())
// console.log('doFetch -- ', tester.next())
// console.log('doFetch -- ', tester.next().value)

