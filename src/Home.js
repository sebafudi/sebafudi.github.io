import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="">
      <h1>Hello.</h1>
      <Link to="/projects">projects</Link>
    </div>
  );
}

export default Home;
