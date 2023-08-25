import { Component } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class Navigation extends Component {
  render() {
    const { params } = this.props.router;
    let paths = new Array();
    paths.push({ name: "Home", path: "/" });
    paths.push({ name: "Projects", path: "/projects" });
    if (
      !(
        params &&
        Object.keys(params).length === 0 &&
        params.constructor === Object
      )
    )
      paths.push({
        name: params.name,
        path: `/projects/${params.name}`,
      });
    return <Breadcrumb paths={paths} />;
  }
}

export default withRouter(Navigation);
