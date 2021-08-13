import React from "react";
import ReactDOM from "react-dom";
import Project from "./Project";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "sebafudi"),
    ...[1, 2, 3, 4].map((i) => React.createElement("div", {}, `test${i}`)),
    React.createElement(Project, { name: "project1", technology: "react.js" }),
    React.createElement(Project, { name: "project2", technology: "js" }),
    React.createElement(Project, { name: "project3", technology: "nest.js" }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
