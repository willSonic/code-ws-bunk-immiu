const Promise = require("bluebird");
const request =  require("request");

 function getStuff(uri){
      return new Promise( (resolve, reject) =>{
         request(uri,  (error, response, body)=> {
           if( error ){
               reject (new Error(error.message));
           }else if( response && response.statusCode === 200){
               resolve(body)
           }
        });
    });
}

function* doFetch(){
   try {
     let response = yield getStuff('https://jsonplaceholder.typicode.com/todos/1');
     //yield JSON.parse(response)
   }
   catch (err) {
        console.log( "Error: " + err );
    }
}
let iterator = doFetch();
Promise.all( [ ...iterator ] ) // Convert iterator to an array or yielded promises.
    .then( ( lines ) =>{
            for ( var line of lines ) {
                console.log( line );
            }

        });

/*
  Using an async and await to respond after promise chain is complete
  https://www.codementor.io/tiagolopesferreira/asynchronous-iterators-in-javascript-jl1yg8la1
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
 */

function  iterateGenerator(urls){
   const  iterable = {};
   const urlPromises = urls;
   iterable[Symbol.asyncIterator] =
      async function* (urlPromises){
            const promises  = urls.map(url=> getStuff(url));
            while (promises.length) {
                 yield promises.shift();
            }
      };
  return iterable;
};


const iter = iterateGenerator(['https://jsonplaceholder.typicode.com/todos/1']);

(async () => {
    for await (const item of iter) {
       console.log(item);
    }
    console.log("done");
})();




