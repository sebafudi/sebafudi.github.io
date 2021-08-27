import { Component } from "react";
import { withRouter } from "react-router-dom";
import base64 from "base-64";
import marked from "marked";

class Details extends Component {
  constructor() {
    super();

    this.state = { loading: true };
  }
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
    this.setState(Object.assign({ loading: false, status: res.status }, json));
  }
  render() {
    const { status, content, loading } = this.state;
    if (loading === false) {
      if (status !== 200) {
        return (
          <section className="section">
            <div className="notification is-warning">No README.md found</div>
          </section>
        );
      }
      let readme = base64.decode(content);
      return (
        <section className="section">
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: marked(readme) }} />
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

export default withRouter(Details);
