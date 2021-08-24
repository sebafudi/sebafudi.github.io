import { useState, useEffect } from "react";
import Results from "./Results";

let TECHNOLOGIES = [];

const SearchParams = () => {
  const [name, setName] = useState("");
  const [technology, setTechnology] = useState("All");
  const [projects, setProjects] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    requestProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterProjects();
  }, [projectList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterProjects();
  }, [technology]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestProjects() {
    let response = await fetch("https://api.github.com/users/sebafudi/repos", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    let json = await response.json();
    if (response.status === 200) {
      TECHNOLOGIES.push("All");
      for (let project of json) {
        if (project.language) {
          TECHNOLOGIES.push(project.language);
        }
      }
      TECHNOLOGIES = TECHNOLOGIES.filter(
        (v, i, a) => a.indexOf(v) === i && v !== null
      );
      json.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      console.log(json);
      setProjectList(json);
    }
  }

  function filterProjects() {
    if (technology === "All") {
      setProjects(projectList);
    } else {
      setProjects(projectList.filter((v) => v.language == technology));
    }
  }

  return (
    <div className="search-params">
      <div className="section">
        <form onSubmit={(e) => e.preventDefault()}>
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
                {TECHNOLOGIES.map((technology) => (
                  <option value={technology} key={technology}>
                    {technology}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="section has-background-primary">
        <Results projects={projects} />
      </div>
    </div>
  );
};

export default SearchParams;
