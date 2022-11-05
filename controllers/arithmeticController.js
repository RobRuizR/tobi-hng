const handleArithmetic = async (req, res) => {
  const { x, y, operation_type } = req.body;

  const operationType = operation_type.toLowerCase();

  if (!x || !y || !operation_type) {
    return res
      .status(400)
      .json({ message: "Kindly fill all required fields." });
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return res.status(400).json({ message: "invalid data type" });
  }

  const multiplicationIndex = operationType.indexOf("multip");
  const productIndex = operationType.indexOf("product");
  const additionIndex = operationType.indexOf("add");
  const subtractionIndex = operationType.indexOf("subtract");
  const removeIndex = operationType.indexOf("remove");

  let operator;

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
    return res.status(400).json({ message: "invalid operation type" });
  }

  let result;
  if (operator === "multiplication") {
    result = x * y;
    return res
      .status(201)
      .json({ slackUsername: "Intuneteq", operationType, result: result });
  } else if (operator === "addition") {
    result = x + y;
    return res
      .status(201)
      .json({ slackUsername: "Intuneteq", operationType, result: result });
  } else {
    result = x - y;
    return res
      .status(201)
      .json({ slackUsername: "Intuneteq", operationType, result: result });
  }
};

module.exports = { handleArithmetic };
