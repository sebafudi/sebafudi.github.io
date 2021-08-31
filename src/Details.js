import { Component } from "react";
import { withRouter } from "react-router-dom";
import base64 from "base-64";
import marked from "marked";
import utf8 from "utf8";
import Breadcrumb from "./Breadcrumb";

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
    const { params } = this.props.match;
    if (loading === false) {
      if (status !== 200) {
        return (
          <section className="section">
            <Breadcrumb
              paths={[
                { name: "Main Page", path: "/" },
                {
                  name: params.name,
                  path: `/details/${params.name}`,
                },
              ]}
            />
            <div className="notification is-warning">No README.md found</div>
          </section>
        );
      }
      let readme = base64.decode(content);
      readme = utf8.decode(readme);
      return (
        <section className="section">
          <Breadcrumb
            paths={[
              { name: "Main Page", path: "/" },
              {
                name: params.name,
                path: `/details/${params.name}`,
              },
            ]}
          />
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
