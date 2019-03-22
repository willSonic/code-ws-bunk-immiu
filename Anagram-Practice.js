
class Anagram{
    constructor(str){
        this.dictionary={};
        this.addDocument(str);
    }

    addWord(word){
       const key = this.getKeyWord(word);
       if(!this.dictionary[key]){
          this.dictionary[key]={};
       }
       this.dictionary[key][word]=true;
    }

    get data(){
      let result = [];
      for(let key in this.dictionary){
          if(this.dictionary[key]){
             let wordsWorth =  Object.keys(this.dictionary[key]);
             if(wordsWorth.length>1){
                result.push(wordsWorth)
             }
          }
      }
      return result;
    }

    get(word){
       return  Object.keys(this.dictionary[this.getKeyWord(word)]);
    }

    getKeyWord(word){
      return word.toLowerCase().split('').sort().join('');
    }


    addDocument(str){
      const words = str.replace(/[^a-zA-Z ]/g, "").split(' ');
      for(let word of words){
         if(word.length>0){
             this.addWord(word)
         }
      }

    }
}
const input1 = 'A tale about a kiwi drinking a late on the wiki.';
const input2 = 'No language like javascript.';


var myAna = new Anagram( input1);
console.log(' myAna.data =', myAna.data);
console.log(' myAna.getWord("tale")  =', myAna.get("tale"));

