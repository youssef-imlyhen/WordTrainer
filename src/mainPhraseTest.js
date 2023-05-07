var fs = require("fs");
var express = require("express");
var cors = require('cors')

 fs.readFile("phrases.txt", "utf8", (err, data) => {
  if (err) {
    console.log(
      "sorry body something has happend durign the opening of the words.txt file"
    );
    return;
  }
  let lines =  data.split(/\n/).map((line) => line.split("="));
  console.log(lines);
  words =   wordRandomizer(lines, 20);  

//   console.log(words);
})
//   // the express stuff now 
//   const app = express();
//   app.use(cors())
//   app.get('/', (req, res) => {
//     res.status(200).json(words);
//   })

//   app.listen(8080, () => {
//     console.log('app running on 8080');
//   })
// });













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

