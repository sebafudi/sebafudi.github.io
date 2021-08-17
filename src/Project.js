const Project = (props) => {
  return (
    <div className="project">
      <h2>{props.name}</h2>
      <h3>{props.technology}</h3>
    </div>
  );
};

export default Project;
