import { Component } from "react";
import { withRouter } from "react-router-dom";

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
    this.setState(Object.assign({ loading: false }, json));
  }
  render() {
    const { content, encoding, name } = this.state;
    return <h1>{name}</h1>;
  }
}

export default withRouter(Details);
