import { useState } from "react";

const TECHNOLOGIES = ["react", "node.js", "c++"];

const SearchParams = () => {
  const [name, setName] = useState("website");
  const [technology, setTechnology] = useState("");

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
    </div>
  );
};

export default SearchParams;
