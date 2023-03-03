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

function route() {
  const hash = location.hash.slice(1).toLocaleLowerCase() || "/";
  hash === "/termofuse" && termOfUseHandler();
  hash === "/privacy" && privacyHandler();
}

window.addEventListener("load", route);
