const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3500;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet()); //helps send necessary headers with request and response

const responseData = {
  slackUsername: "intuneteq",
  backend: true,
  age: 25,
  bio: "My name is Tobi Olanitori, I a Full stack web engineer with a B.eng in Computer Engineering and I am 25 years old. My primary programming language is Javascript but i can also write program algorithms using c#. Asides programming, I love ART, all types of art forms but majorly performing and visual arts. I love to listen to music in my leisures(also read that as when i am busy writing codes like i am currently listening to 'Bolo Bolo' by The Cavemen). I love painting, going on paint dates, art museums and exhibitions with friends. My ultimate goal is to write lines of codes that'll bring ease to humans on their day to day life journey",
};

const jsonContent = JSON.stringify(responseData);

app.get("/", (req, res) => {
  res.send(jsonContent);
});

//routes
app.use("/", require("./routes/arithmetic"));

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
