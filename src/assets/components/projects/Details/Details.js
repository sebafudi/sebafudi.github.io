import { Component } from "react";
import { withRouter } from "react-router-dom";
import base64 from "base-64";
import marked from "marked";
import utf8 from "utf8";
import ErrorBoundary from "../../../ErrorBoundary";

class Details extends Component {
  state = { loading: true };
  async componentDidMount() {
    const res = await fetch(
      `https://api.github.com/repos/sebafudi/${this.props.match.params.name}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const json = await res.json();
    this.setState({
      loading: false,
      status: res.status,
      content: json.content,
    });
  }
  render() {
    const { status, content, loading } = this.state;
    if (loading === false) {
      if (status !== 200) {
        if (status === 404) {
          return (
            <section className="section">
              <div className="notification is-warning">No README.md found</div>
            </section>
          );
        } else {
          throw new Error("Api error");
        }
      }
      let readme = base64.decode(content);
      readme = utf8.decode(readme);
      return (
        <section className="section">
          <div className="content">
            <div className="box">
              <div dangerouslySetInnerHTML={{ __html: marked(readme) }} />
            </div>
          </div>
        </section>
      );
    }
    return (
      <section className="section">
        <div className="notification is-info">Loading</div>
      </section>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
