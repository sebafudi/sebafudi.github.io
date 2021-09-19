import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="">
          <p className="title">hello</p>
          <p className="subtitle">
            <Link to="/projects">my projects</Link>
            <br />
            <a href="https://github.com/sebafudi">my github</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
