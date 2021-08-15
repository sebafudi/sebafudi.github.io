import ReactDOM from "react-dom";
import Project from "./Project";

const App = () => {
  return (
    <div>
      <h1>sebafudi</h1>
      <Project name="project1" technology="react.js"></Project>
      <Project name="project2" technology="js"></Project>
      <Project name="project3" technology="nest.js"></Project>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
