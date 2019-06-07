const express = require('express');

const app = express();

app.get('/sum', (req, res) => {
  const one = parseFloat(req.query.numberOne, 10);
  const two = parseFloat(req.query.numberTwo, 10);
  const sum = one + two; 

  (isNaN(one) || isNaN(two)) ? res.status(400).send('Please provide valid numbers') : res.send(`The sum of ${one} and ${two} is ${sum}.`)
});

app.get('/cipher', (req, res) => {
  let caesarInput = req.query.input;
  let caesarShift = parseInt(req.query.shift);
  let resultLetter = '';

  if(caesarShift < 1 || caesarShift > 255) {
    return res.status(400).send('Please provide a shift number greater than 0, but below 256.');
  }
  else {
    for(var i = 0; i < caesarInput.length; i++) {
      let index = caesarInput.charCodeAt(i); 
      resultLetter += String.fromCharCode(index + caesarShift);
    }
    res.send(resultLetter);
  }
});

app.get('/lotto', (req,res) => {
  let numbers = req.query.arr;
  let lottoArr = [];
  let newArr = [];
  let didUserWin;

  for(var i = 0; i < 6; i++) {
    lottoArr.push(Math.floor(Math.random()*20));
  }

  if(!Array.isArray(numbers)){
    return res.status(400).send('numbers must be an array')
  }

  if(!numbers){
    return res.status(400).send('numbers are required')
  }

  if(numbers.length != 6){
    return res.status(400).send('you must enter 6 numbers between 1 and 20')
  }

  numbers.map(i => {
    lottoArr.map(j => {
    if(i==j) {
      newArr.push(j);
    }
    })
  })

  switch(newArr.length) {
    case 4: 
      didUserWin = 'Congratulations, you win a free ticket!';
      break;
    case 5:   
      didUserWin = 'Congratulations! You win $100!';
      break;
    case 6:
      didUserWin = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    default:
      didUserWin = 'Sorry, you lose';  
  }
  res.send(didUserWin);
})

// listening for incoming connections
app.listen(8000, () => {
  console.log('App is listening on 8000')
})