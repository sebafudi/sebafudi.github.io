import { Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <section className="home-container">
      <div className="home-items">
        <p className="home-title">hello</p>
        <p className="home-item">
          <Link to="/projects">my projects</Link>
        </p>
        <p className="home-item">
          <a
            href="https://github.com/sebafudi"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        </p>
        <p className="home-item">
          <a
            href="https://www.linkedin.com/in/sebafudi/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin
          </a>
        </p>
      </div>
    </section>
  );
}

export default Home;
