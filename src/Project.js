import React from "react";

const Project = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h2", {}, props.name),
    React.createElement("h3", {}, props.technology),
  ]);
};

export default Project;
