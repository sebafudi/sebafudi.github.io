import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "@fortawesome/fontawesome-free";

dayjs.extend(relativeTime);

const Project = (props) => {
  return (
    <div className="box m-2 is-flex-grow-1">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{props.name}</strong>{" "}
              <small>
                {props.archived ? (
                  <>
                    <span className="fas fa-archive" />{" "}
                  </>
                ) : (
                  ""
                )}
                <time dateTime={props.pushed_at}>
                  {dayjs(props.pushed_at).fromNow()}
                </time>
              </small>
              <br />
              <p>{props.technology}</p>
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a
                className="level-item"
                aria-label="github repository"
                href={props.html_url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="fab fa-github"></span>
              </a>
              {props.homepage ? (
                <a
                  className="level-item"
                  aria-label="live version"
                  href={props.homepage}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="fas fa-play-circle" />
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Project;
