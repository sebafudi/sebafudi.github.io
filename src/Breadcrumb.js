import { Component } from "react";
import { Link } from "react-router-dom";

class Breadcrumb extends Component {
  render() {
    const { paths } = this.props;
    return (
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {paths.map((v) => {
            if (paths.indexOf(v) === paths.length - 1) {
              return (
                <li key={v.name} className="is-active">
                  <Link aria-label={v.name} to={v.path}>
                    {v.name}
                  </Link>
                </li>
              );
            }
            return (
              <li key={v.name}>
                <Link aria-label={v.name} to={v.path}>
                  {v.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Breadcrumb;
