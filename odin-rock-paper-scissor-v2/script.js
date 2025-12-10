const container = document.querySelector("#container");

const web_title_div = document.createElement("div");
web_title_div.className = "web-title";

const web_title = document.createElement("h1");
web_title.textContent = "ROCK PAPER SCISSORS";

web_title_div.appendChild(web_title);
container.appendChild(web_title_div);
