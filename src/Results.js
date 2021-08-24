import Project from "./Project";

const Results = ({ projects }) => {
  return (
    <div className="projects is-flex is-flex-wrap-wrap">
      {!projects.length ? (
        <div className="box">No projects / problem conneting to GitHub</div>
      ) : (
        projects.map((project) => (
          <Project
            name={project.name}
            technology={project.language || "Not known"}
            key={project.id}
            html_url={project.html_url}
            pushed_at={project.pushed_at}
            homepage={project.homepage}
            archived={project.archived}
          />
        ))
      )}
    </div>
  );
};

export default Results;
