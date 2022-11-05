const arithmeticController = require("./arithmeticController");

console.assert(typeof arithmeticController.handleArithmetic === "function");

console.log("Testing parsing our body");
console.log("\tTesting for intx");

console.assert(
  arithmeticController.parseNumbersFromBody({
    x: 5,
    y: 10,
    operationType: "addition",
  }).intx === 5
);

console.log("\tTesting for inty");
console.assert(
  arithmeticController.parseNumbersFromBody({
    x: 5,
    y: 10,
    operationType: "addition",
  }).inty === 10
);

console.log("\tTesting operationType parsing");
let result = arithmeticController.parseNumbersFromBody({
  x: undefined,
  y: undefined,
  operationType: "add 3 and 4",
});
console.assert(result.intx === 3);

console.log("Testing parsing our operator");
console.log("\tTesting for addition");
console.assert(
  arithmeticController.getOperator("please please please add 3 and 4")
    .operator === "addition"
);

console.log("\tTesting for multiplication");
console.assert(
  arithmeticController.getOperator("please please please multiply 3 and 4")
    .operator === "multiplication"
);

console.log("\tTesting for subtraction");
console.assert(
  arithmeticController.getOperator("please please please subtract 3 and 4")
    .operator === "subtraction"
);
