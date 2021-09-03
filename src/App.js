import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./style.scss";
import SearchParams from "./SearchParams";
import Details from "./Details";
import Navigation from "./Navigation";

const App = () => {
  return (
    <div>
      <Router>
        <nav
          className="navbar is-primary is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <span className="navbar-item">
            <span className="title">sebafudi</span>
          </span>

          <Route path={["/details/:name", "/"]}>
            <span className="navbar-item" href="https://bulma.io">
              <Navigation />
            </span>
          </Route>
        </nav>
        <Switch>
          <Route path="/details/:name">
            <Details />
          </Route>
          <Route path="/">
            <SearchParams />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
