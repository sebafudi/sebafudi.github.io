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
      <div className="section">
        <form>
          <div className="field">
            <label className="label" htmlFor="name">
              Name
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="name"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="technology">
              Technology
            </label>
            <div className="control">
              <select
                className="select"
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
            </div>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
      <div className="section has-background-primary">
        <div className="projects is-flex is-flex-wrap-wrap">
          {projects.map((project) => (
            <Project
              name={project.name}
              technology={project.language}
              key={project.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchParams;
