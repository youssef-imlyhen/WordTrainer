var fs = require("fs");
var express = require("express");
var cors = require('cors')


  // the express stuff now 
  const app = express();
  app.use(cors())
  app.get('/words/fr_en/', (req, res) => {
    // let wordsNum = req.params.amountOfWords;
    // wordsNum ? wordsNum : 20;
    fs.readFile("words.txt", "utf8", (err, data) => {
      if (err) {
        console.log(
          "sorry body something has happend durign the opening of the words.txt file"
        );
        return;
      }
      let lines =  data.split(/\n/g).map((line) => line.split(/\s/g));
      const words =   wordRandomizer(lines,20);  
      console.log(words);
      
      res.status(200).json(words);
    });
  })
  
  app.get('/phrases/en_fr/', (req, res) => {
    // let phrasesNum = req.params.amountOfPhrases;
    // phrasesNum ? phrasesNum : 20;
    fs.readFile("phrases.txt", "utf8", (err, data) => {
      if (err) {
          res.write("sorry body something has happend durign the opening of the words.txt file")
        return;
      }
      let lines =  data.split(/\n/).map((line) => line.split("="));
      const words =   wordRandomizer(lines, 20);  
      
      res.status(200).json(words);
    });
  })

  app.listen(8080, () => {
    console.log('app running on 8080');
  })














let wordRandomizer = (lines, numberOfWords) => {
  let set = new Set();
  // get a set of random but unique numbers
  while (set.size !== numberOfWords) {
    let rndmNum = Math.floor(Math.random() * lines.length);
    set.add(rndmNum);
  }
  let finalArr = []
  set.forEach((i) => {
    finalArr.push(lines[i]);
  });
  return finalArr;
};

