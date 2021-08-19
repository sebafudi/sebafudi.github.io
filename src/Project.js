const Project = (props) => {
  return (
    <div className="project card m-2">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{props.name}</p>
            <p className="subtitle is-6">{props.technology}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
