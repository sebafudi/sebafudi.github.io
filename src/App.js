import ReactDOM from "react-dom";
// import Project from "./Project";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">sebafudi</p>
        </div>
      </section>
      <SearchParams />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
