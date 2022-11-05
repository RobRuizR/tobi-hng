const handleArithmetic = (req, res) => {
  const { x, y, operation_type } = req.body;

  if (!operation_type) {
    return res
      .status(400)
      .json({ message: "Kindly fill all required fields." }); //if req body is not complete
  }

  const operationType = operation_type.toLowerCase(); //setting incoming string to lowercase

  let intx; //instantiating the variable that will be used for the operation as x
  let inty; //instantiating the variable that will be used for the operation as y

  if (operationType.length > 14) {
    //if operation_type is longer than 14 words, it's mostly likely telling us to operate the integers in it, if any at all
    const myArray = operationType.split(" "); //declaring an array for eachwords in the operation_type string
    const probableNum = myArray.filter((item) => {
      if (parseInt(item) && typeof parseInt(item) === "number") {
        //filter through the array and check for integers
        return item;
      }
    });

    if (probableNum.length < 2) {
      //if we have less than 2 integers in the array, and we have x and y from the request, set the operating x and y to the req x and y
      intx = x;
      inty = y;
    } else if ((probableNum.length < 2) & !x & !y) {
      //if we have less than 2 integers in the array but we dont have x and y coming in from the request, respond with a bad request
      return res.status(400).json({ message: "missing data types" });
    } else {
      intx = probableNum[0];
      inty = probableNum[1];
    }
  } else {
    intx = x;
    inty = y;
  }

  console.log(intx, inty);

  const multiplicationIndex = operationType.indexOf("multip"); //checking for possible versions of multiplication in operation type
  const productIndex = operationType.indexOf("product"); //checking for possible instance of product as request to handle multiplication
  const additionIndex = operationType.indexOf("add"); //checking for possible instances to handle addition operation
  const sumIndex = operationType.indexOf("sum"); //checking for possible instances to handle addition operation
  const subtractionIndex = operationType.indexOf("subtract"); //checking for possible intances to handle subtraction operation
  const removeIndex = operationType.indexOf("remove"); //checking for possible instances to handle subtraction operation
  const takeAwayIndex = operationType.indexOf("take away"); //checking for possible instances to handle subtraction operation
  const minusIndex = operationType.indexOf("minus"); //checking for possible instances to handle subtraction operation

  let operator; //instantiating the variable to handle whatever operation type sent in

  if (multiplicationIndex !== -1) {
    operator = "multiplication";
  } else if (productIndex !== -1) {
    operator = "multiplication";
  } else if (additionIndex !== -1) {
    operator = "addition";
  } else if (sumIndex !== -1) {
    operator = "addition";
  } else if (subtractionIndex !== -1) {
    operator = "subtraction";
  } else if (removeIndex !== -1) {
    operator = "subtraction";
  } else if (takeAwayIndex !== -1) {
    operator = "subtraction";
  } else if (minusIndex !== -1) {
    operator = "subtraction";
  } else {
    return res.status(400).json({ message: "invalid operation type" }); //if no operation type is detected in operation_type body, its a bad request
  }

  //we have our operation_type handling as operator
  let result; //declaring a variable to hold result of computation
  if (operator === "multiplication") {
    result = parseInt(intx) * parseInt(inty);
    return res.status(201).json({
      slackUsername: "Intuneteq",
      operation_type: operator,
      result: result,
    });
  } else if (operator === "addition") {
    result = parseInt(intx) + parseInt(inty);
    return res.status(201).json({
      slackUsername: "Intuneteq",
      operation_type: operator,
      result: result,
    });
  } else {
    result = parseInt(intx) - parseInt(inty);
    return res.status(201).json({
      slackUsername: "Intuneteq",
      operation_type: operator,
      result: result,
    });
  }
};

module.exports = { handleArithmetic };
