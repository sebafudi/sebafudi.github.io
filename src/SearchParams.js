import { useState, useEffect } from "react";
import Project from "./Project";

let TECHNOLOGIES = [];

const SearchParams = () => {
  const [name, setName] = useState("");
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
      for (let project of json) {
        TECHNOLOGIES.push(project.language);
      }
      TECHNOLOGIES = TECHNOLOGIES.filter(
        (v, i, a) => a.indexOf(v) === i && v !== null
      );
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
            <option value={technology} key={technology}>
              {technology}
            </option>
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
