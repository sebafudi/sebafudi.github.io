import { StrictMode } from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./style.scss";
import SearchParams from "./SearchParams";
import Details from "./Details";
import Navigation from "./Navigation";
import SentryContext from "./SentryContext";

Sentry.init({
  dsn: "https://5554862ca06847e69dfdb3299752f278@o994039.ingest.sentry.io/5952352",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const App = () => {
  return (
    <SentryContext.Provider value={Sentry}>
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
    </SentryContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
