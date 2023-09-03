import { Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <>
      <div class="h-screen bg-animate flex">
        <span class="align-middle m-auto text-white text-8xl text-center">
          <div class="italic">Hello!</div>
          <div>
            <span>
              I'm <span class="text-animate">Sebastian</span>
            </span>
          </div>
        </span>
      </div>
    </>
  );
}

export default Home;
