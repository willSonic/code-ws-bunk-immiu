
const balanceString = (str)=>{
    const balancer = {
       '{':'}',
       '(':')',
       '[':']',
    };
    const stack = [];
    const balancerKeys = Object.keys(balancer);
    for(let i=0; i<str.length; ++i){
        if(balancerKeys.includes(str[i])){
           stack.push(str[i])
        }else{
           var previousVal = stack.pop()
           if(balancer[previousVal] !== str[i] ){
              return false;
           }
        }
    }
    return true;

}


const isStringBalanced= (str)=>{

  let valueCount = str.split('').reduce( ( prevCount, item)=>{
      if( item==='{' || item==='(' || item==='[' ){
         return ++prevCount;
      }else{
        return  --prevCount;
      }

  }, 0)

  return  valueCount === 0;
}

var input1 = "({(()))}}";
var input2 = "[{()()}({[]})]({}[({})])((((((()[])){}))[]{{{({({({{{{{{}}}}}})})})}}}))[][][]";
var input3 = "(){}";
var input4=  "( }";
var input5 =")[}{](";
console.log('balanceString(input1) =', balanceString(input1));
console.log('balanceString(input2) =', balanceString(input2));
console.log('balanceString(input3) =', balanceString(input3));
console.log('balanceString(input5) =', balanceString(input5));
console.log('isStringBalanced(input5) =', isStringBalanced(input5));
