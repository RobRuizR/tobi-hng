const handleArithmetic = async (req, res) => {
  const { x, y, operation_type } = req.body;

  const operationType = operation_type.toLowerCase(); //setting incoming string to lowercase

  if (!x || !y || !operation_type) {
    return res
      .status(400)
      .json({ message: "Kindly fill all required fields." }); //if req body is not complete
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return res.status(400).json({ message: "invalid data type" }); //if x and y are not integers/number
  }

  const multiplicationIndex = operationType.indexOf("multip"); //checking for possible versions of multiplication in operation type
  const productIndex = operationType.indexOf("product"); //checking for possible instance of product as request to handle multiplication
  const additionIndex = operationType.indexOf("add"); //checking for possible instances to handle addition operation
  const subtractionIndex = operationType.indexOf("subtract"); //checking for possible intances to handle subtraction operation
  const removeIndex = operationType.indexOf("remove"); //checking for possible instances to handle subtraction operation

  let operator; //declaring the variable to handle whatever operation type sent in

  if (multiplicationIndex !== -1) {
    operator = "multiplication";
  } else if (productIndex !== -1) {
    operator = "multiplication";
  } else if (additionIndex !== -1) {
    operator = "addition";
  } else if (subtractionIndex !== -1) {
    operator = "subtraction";
  } else if (removeIndex !== -1) {
    operator = "subtraction";
  } else {
    return res.status(400).json({ message: "invalid operation type" }); //if no operation type is detected in operation_type body, its a bad request
  }

  //we have our operation_type handling as operator
  let result; //declaring a variable to hold result of computation
  if (operator === "multiplication") {
    result = x * y;
    return res
      .status(201)
      .json({
        slackUsername: "Intuneteq",
        operation_type: operator,
        result: result,
      });
  } else if (operator === "addition") {
    result = x + y;
    return res
      .status(201)
      .json({
        slackUsername: "Intuneteq",
        operation_type: operator,
        result: result,
      });
  } else {
    result = x - y;
    return res
      .status(201)
      .json({
        slackUsername: "Intuneteq",
        operation_type: operator,
        result: result,
      });
  }
};

module.exports = { handleArithmetic };
