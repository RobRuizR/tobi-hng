const handleArithmetic = async (req, res) => {
  const { x, y, operation_type } = req.body;

  if (!x || !y || !operation_type) {
    return res
      .status(400)
      .json({ message: "Kindly fill all required fields." });
  }

  if (
    operation_type !== "*" &&
    operation_type !== "+" &&
    operation_type !== "-"
  ) {
    return res.status(400).json({ message: "invalid operation type" });
  }

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return res.status(400).json({ message: "invalid data type" });
  }

  let result;
  if (operation_type === "*") {
    result = x * y;
    return res.status(201).json({ slackUsername: "Intuneteq", result: result });
  } else if (operation_type === "+") {
    result = x + y;
    return res.status(201).json({ slackUsername: "Intuneteq", result: result });
  } else {
    result = x - y;
    return res.status(201).json({ slackUsername: "Intuneteq", result: result });
  }
};

module.exports = { handleArithmetic };
