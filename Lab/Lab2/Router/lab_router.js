const express = require("express");
const router = express.Router();

router.get("/name", (req, res) => {
  res.send("Palmer Ngale");
});

router.get("/greeting", (req, res) => {
  const studentNumber = "n01673071";
  res.send(`Name: Palmer Ngale, Student Number: ${studentNumber}`);
});

router.get("/add", (req, res) => {
  const { x, y } = req.query;
  const numX = parseFloat(x);
  const numY = parseFloat(y);

  if (isNaN(numX) || isNaN(numY)) {
    return res.status(400).send("Invalid numbers provided.");
  }

  const result = numX + numY;
  res.send(`The sum of ${numX} and ${numY} is ${result}`);
});

router.get("/calculate", (req, res) => {
  const { a, b, operation } = req.query;

  if (!a || !b || !operation) {
    return res
      .status(400)
      .send("Please provide 'a', 'b', and 'operation' as query parameters.");
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).send("Invalid numbers provided.");
  }

  let result;
  switch (operation) {
    case "+":
      result = numA + numB;
      break;
    case "-":
      result = numA - numB;
      break;
    case "*":
      result = numA * numB;
      break;
    case "/":
      result = numB !== 0 ? numA / numB : "Error: Division by zero";
      break;
    case "**":
      result = numA ** numB;
      break;
    default:
      return res
        .status(400)
        .send("Invalid operation. Use +, -, *, /, or **.");
  }

  res.send(`The result of ${numA} ${operation} ${numB} is ${result}`);
});

module.exports = router;
