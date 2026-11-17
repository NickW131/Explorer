import { Link, useParams } from "react-router-dom";
import { getWebsites } from "../utils/websiteStorage.js";
import "../styles/details.css";
import "../styles/global.css";

export default function Details() {
  const { id } = useParams();

  const websites = getWebsites();

  const website = websites.find((site) => site.id === Number(id));

  if (!website) {
    return (
      <div className="manage-page">
        <header className="manage-header">
          <Link to="/" className="manage-logo">
            Website Index
          </Link>
        </header>

        <main className="manage-main">
          <h1>Website Not Found</h1>
          <Link to="/" className="manage-back-button">
            ← Back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="manage-page">
      <header className="manage-header">
        <Link to="/" className="manage-logo">
          Website Index
        </Link>
      </header>

      <main className="manage-main">
        <div className="manage-heading">
          <Link to="/" className="manage-back-button">
            ← Back
          </Link>

          <h1>Website Details</h1>
        </div>

        <div className="manage-layout">
          <section className="manage-editor">
            <div className="manage-editor-content">
              <div className="manage-preview">Website Preview</div>

              <div className="manage-fields">
                <label>Website Name</label>
                <div className="details-field">{website.name}</div>

                <label>Website URL</label>
                <div className="details-field">{website.url}</div>

                <label>Website Description</label>
                <div className="details-field details-description-field">
                  {website.description}
                </div>

                <div className="details-visit">
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>

              <div className="manage-tags-section">
                <h2>Website Tags</h2>

                <div className="manage-tags">
                  {website.tags.map((tag) => (
                    <span className="manage-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="manage-metadata">
            <Metadata label="Added By" value="Curator" />
            <Metadata label="Date Added" value="Not available" />
            <Metadata label="Status" value="Published" />
          </aside>
        </div>
      </main>
      <footer className="site-footer">
        <Link to="/about">About</Link>
        <Link to="/contacts">Contacts</Link>
      </footer>
    </div>
  );
}

function Metadata({ label, value }) {
  return (
    <div className="manage-metadata-item">
      <label>{label}</label>
      <div>{value}</div>
    </div>
  );
}
