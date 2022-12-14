/**
 * This function tries to parse the data from the request body if it exists on the operationType field.
 */
const parseNumbersFromBody = ({ x, y, operationType }) => {
  let intx; //instantiating the variable that will be used for the operation as x
  let inty; //instantiating the variable that will be used for the operation as y
  // Parsing data
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
    } else if (probableNum.length < 2 && !x && !y) {
      //if we have less than 2 integers in the array but we dont have x and y coming in from the request, respond with a bad request
      return { intx: 0, inty: 0, error: "missing data types" };
    } else {
      intx = parseInt(probableNum[0]);
      inty = parseInt(probableNum[1]);
    }
  } else {
    intx = x;
    inty = y;
  }

  return { intx, inty, error: "" };
};

const getOperator = (operationType) => {
  // Decide what operation we're executing
  const hasAdditionOperator =
    operationType.includes("add") || operationType.includes("sum");
  const hasProductOperator =
    operationType.includes("multip") || operationType.includes("product");
  const hasSubtractionOperator =
    operationType.includes("subtract") ||
    operationType.includes("remove") ||
    operationType.includes("take away") ||
    operationType.includes("minus");

  let operator; //instantiating the variable to handle whatever operation type sent in

  if (hasProductOperator) {
    operator = "multiplication";
  } else if (hasAdditionOperator) {
    operator = "addition";
  } else if (hasSubtractionOperator) {
    operator = "subtraction";
  } else {
    return { operator: "", error: "invalid operation type" };
  }

  return { operator, error: "" };
};

const handleArithmetic = (req, res) => {
  const { x, y, operation_type } = req.body;
  console.log({ x, y, operation_type });

  if (!operation_type) {
    return res
      .status(400)
      .json({ message: "Kindly fill all required fields." }); //if req body is not complete
  }

  const operationType = operation_type.toLowerCase(); //setting incoming string to lowercase

  const { intx, inty, error } = parseNumbersFromBody({
    x,
    y,
    operationType,
  });

  if (error) {
    return res.status(400).json({ message: error });
  }

  const { operator, error: operatorError } = getOperator(operationType);

  if (operatorError) {
    return res.status(400).json({ message: operatorError });
  }

  // Computation and getting the result
  // we have our operation_type handling as operator
  let result = intx - inty; //declaring a variable to hold result of computation
  if (operator === "multiplication") {
    result = intx * inty;
  } else if (operator === "addition") {
    result = intx + inty;
  }

  return res.status(200).json({
    slackUsername: "Intuneteq",
    operation_type: operator,
    result: result,
  });
};

module.exports = { handleArithmetic, parseNumbersFromBody, getOperator };
