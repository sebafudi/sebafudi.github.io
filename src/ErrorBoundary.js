import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error({ error, info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <section className="section">
            <div className="notification is-warning">
              {"Unexpected Error! Probably you've hit GitHub's Api rate limit"}
            </div>
          </section>
        </>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
