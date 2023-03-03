const root_div = document.getElementById("root");

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

function termOfUseHandler() {
  const div = document.createElement("div");
  div.innerHTML = "<h1>Term Of Use</h1>";
  removeChildren(root_div);
  root_div.appendChild(div);
}

function privacyHandler() {
  const div = document.createElement("div");
  div.innerHTML = "<h1>Privacy</h1>";
  removeChildren(root_div);
  root_div.appendChild(div);
}

function configHandler() {
  removeChildren(root_div);
  console.log("config");
}

function indexHandler() {
  const div = document.createElement("div");
  div.innerHTML = "<h1>Hello World</h1> <p>Your app is running well.</p>";
  removeChildren(root_div);
  root_div.appendChild(div);
}

function route() {
  const hash = location.hash.slice(1).toLocaleLowerCase() || "/";
  hash === "/termofuse" && termOfUseHandler();
  hash === "/privacy" && privacyHandler();
  hash === "/config" && configHandler();
  hash === "/" && indexHandler();
}

window.addEventListener("hashchange", route);
window.addEventListener("load", route);
