import { Component } from "react";
import { withRouter } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

class Navigation extends Component {
  render() {
    const { params } = this.props.match;
    let paths = new Array();
    paths.push({ name: "Main Page", path: "/" });
    if (
      !(
        params &&
        Object.keys(params).length === 0 &&
        params.constructor === Object
      )
    )
      paths.push({ name: params.name, path: `/details/${params.name}` });
    return <Breadcrumb paths={paths} />;
  }
}

export default withRouter(Navigation);
