import { StrictMode } from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "../../style.scss";
import SearchParams from "../projects/SearchParams/SearchParams";
import Details from "../projects/Details/Details";
import Navigation from "../projects/Navigation/Navigation";
import SentryContext from "../../SentryContext";
import Home from "../Home/Home";
import { createRoot } from "react-dom/client";
import React from "react";

Sentry.init({
  dsn: "https://5554862ca06847e69dfdb3299752f278@o994039.ingest.sentry.io/5952352",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const NavBar = () => {
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <span className="navbar-item">
        <span className="title">sebafudi</span>
      </span>
      <span className="navbar-item">
        <Navigation />
      </span>
    </nav>
  );
};

const App = () => {
  return (
    <SentryContext.Provider value={Sentry}>
      <div>
        <Router>
          <Routes>
            <Route
              path="/projects/:name"
              element={
                <>
                  <NavBar />
                  <Details />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <NavBar />
                  <SearchParams />
                </>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </SentryContext.Provider>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
