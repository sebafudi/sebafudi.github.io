import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "@fortawesome/fontawesome-free";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const Project = ({
  name,
  archived,
  pushed_at,
  html_url,
  homepage,
  description,
}) => {
  return (
    <div className="box m-2 is-flex-grow-1">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <strong>{name}</strong>{" "}
            <small>
              {archived ? (
                <>
                  <span className="fas fa-archive" />{" "}
                </>
              ) : (
                ""
              )}
              <time dateTime={pushed_at}>{dayjs(pushed_at).fromNow()}</time>
            </small>
            <br />
            <p>
              {description ? (
                description
              ) : (
                <i>
                  <small>No description</small>
                </i>
              )}
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <Link
                className="level-item"
                aria-label="info"
                to={`/projects/details/${name}`}
              >
                <span className="fas fa-info"></span>
              </Link>
              <a
                className="level-item"
                aria-label="github repository"
                href={html_url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="fab fa-github"></span>
              </a>
              {homepage ? (
                <a
                  className="level-item"
                  aria-label="live version"
                  href={homepage}
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
