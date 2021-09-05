import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false, secToRedirect: -1 };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.setState({ secToRedirect: 5 });
    this.intervalHandle = setInterval(() => {
      this.setState({ secToRedirect: this.state.secToRedirect - 1 });
      if (this.state.secToRedirect <= 0) {
        this.setState({ redirect: true });
      }
    }, 1000);
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    clearTimeout(this.intervalHandle);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <>
          <section className="section">
            <div className="notification is-warning">
              {"Unexpected Error! Probably you've hit GitHub's Api rate limit"}
              <br />
              {"Redirecting to "}
              <Link to="/">Main Page</Link>
              {" in "}
              {this.state.secToRedirect}
              {" seconds"}
            </div>
          </section>
        </>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
