import { useState, useEffect } from "react";
import Project from "./Project";

const TECHNOLOGIES = ["react", "node.js", "c++"];

const SearchParams = () => {
  const [name, setName] = useState("website");
  const [technology, setTechnology] = useState("All");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    requestProjects();
  }, []);

  async function requestProjects() {
    let response = await fetch("https://api.github.com/users/sebafudi/repos", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    let json = await response.json();
    if (response.status === 200) {
      setProjects(json);
    } else {
      setProjects([{ name: response.status, language: json.message }]);
    }
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="technology">
          Technology
          <select
            id="technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            onBlur={(e) => setTechnology(e.target.value)}
          >
            <option />
            {TECHNOLOGIES.map((technology) => (
              <option value={technology} key={technology}>
                {technology}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <div className="projects">
        {projects.map((project) => (
          <Project
            name={project.name}
            technology={project.language}
            key={project.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchParams;
