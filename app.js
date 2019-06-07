const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
  const one = parseFloat(req.query.numberOne, 10);
  const two = parseFloat(req.query.numberTwo, 10);
  const sum = one + two; 

  if(!one || isNaN(one)) {
    return res.status(400).send('Please provide a valid first number');
  }

  if(!two || isNaN(two)) {
    return res.status(400).send('Please provide a valid second number');
  }

  res.send(`The sum of ${one} and ${two} is ${sum}.`)
});

app.get('/cipher', (req, res) => {
  let caesarInput = req.query.input;
  let caesarShift = parseInt(req.query.shift);
  let result = '';

  for(var i = 0; i < caesarInput.length; i++) {
    let index = caesarInput.charCodeAt(i);  // dogs = 100
    let resultLetter = caesarInput[i];  
    if(index >= 65 && index <= 90) {
      resultLetter = String.fromCharCode((index - 65 + caesarShift) % 26 + 65);
      console.log(caesarShift);
      console.log(resultLetter);
      console.log(index);
    }
    else if(index >= 97 && index <= 122) {
      resultLetter = String.fromCharCode((index - 97 + caesarShift) % 26 + 97);
      console.log(caesarShift);
      console.log(resultLetter);
      console.log(index);
    }
    result += resultLetter;
  }
  res.send(result);
});

// listening for incoming connections
app.listen(8000, () => {
  console.log('App is listening on 8000')
})