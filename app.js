const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello Home Route!");
});

/*Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values. Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should be given to converting them to numbers.*/

app.get("/sum", (req, res) => {
  const { a, b } = req.query;

  //validations
  if (!a) {
    res.send("a is required");
  }
  if (!b) {
    res.send("b is required");
  }
  let numA = parseInt(a);
  console.log(numA);

  let numB = parseInt(b);
  console.log(numB);

  let c = numA + numB;

  let responseString = `the sum of a an b is equal to ${c}`;
  res.send(responseString);
});

/*Create an endpoint /cipher. The handler function should accept a query parameter named text and one named shift. Encrypt the text using a simple shift cipher also known as a Caesar Cipher. It is a simple substitution cipher where each letter is shifted a certain number of places down the alphabet. So if the shift was 1 then A would be replaced by B, and B would be replaced by C and C would be replaced by D and so on until finally Z would be replaced by A. using this scheme encrypt the text with the given shift and return the result to the client. Hint - String.fromCharCode(65) is an uppercase A and 'A'.charCodeAt(0) is the number 65. 65 is the integer value of uppercase A in UTF-16. See the documentation for details.*/

app.get("/cipher", (req, res) => {
  const { text, shift } = req.query;

  //validations
  if (!text) {
    res.send("please enter a text");
  }

  if (!shift) {
    res.send("please enter a shift");
  }

  let numShift = Number(shift);
  console.log(numShift);
  let cipher = text
    .split("")
    .map((x) => {
      let code = x.charCodeAt(0) + numShift;
      console.log(code);
      let string = String.fromCharCode(code);
      console.log(string);
      return string;
    })
    .join("");

  let responseString = `let encrypted message = ${cipher}`;
  res.send(responseString);
});

/*To send an array of values to the server via a query string simply repeat the key with different values. For instance, the query string ?arr=1&arr=2&arr=3 results in the query object { arr: [ '1', '2', '3' ] }. Create a new endpoint /lotto that accepts an array of 6 distinct numbers between 1 and 20 named numbers. The function then randomly generates 6 numbers between 1 and 20. Compare the numbers sent in the query with the randomly generated numbers to determine how many match. If fewer than 4 numbers match respond with the string "Sorry, you lose". If 4 numbers match respond with the string "Congratulations, you win a free ticket", if 5 numbers match respond with "Congratulations! You win $100!". If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!".*/

app.get("/lotto", (req, res) => {
  const { numbers } = req.query;
  console.log(numbers);

  let random = Math.floor(Math.random() * 20) + 1;
  console.log(random);

  res.send("lotto page");
});

app.listen(8000, () => {
  console.log("Express server is listening on http://localhost:8000");
});
