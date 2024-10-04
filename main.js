const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  const mainPageCounter = JSON.parse(
    fs.readFileSync(path.join(__dirname, "counterPageJson.json"), "utf-8")
  );
  mainPageCounter.counterMainPage++;
  res.send(
    `<h1>Корневая страница</h1>\n<p>Просмотров: ${mainPageCounter.counterMainPage}</p>\n<a href = '/about'>Ссылка на страницу /about</a>`
  );
  fs.writeFileSync(
    path.join(__dirname, "counterPageJson.json"),
    JSON.stringify(mainPageCounter, null, 2)
  );
});

app.get("/about", (req, res) => {
  const aboutPageCounter = JSON.parse(
    fs.readFileSync(path.join(__dirname, "counterPageJson.json"), "utf-8")
  );
  aboutPageCounter.counterAboutPage++;
  const aboutPageJson = { "/about": "aboutPageCounter" };
  res.send(
    `<h1>Страница about</h1>\n<p>Просмотров: ${aboutPageCounter.counterAboutPage}</p>\n<a href = '/'>Ссылка на страницу /</a>`
  );
  fs.writeFileSync(
    path.join(__dirname, "counterPageJson.json"),
    JSON.stringify(aboutPageCounter, null, 2)
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порте : ${port}`);
});
