import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/submission.css";
import "../styles/global.css";
import { getSubmissions } from "../utils/submissionStorage.js";

export default function Submissions() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const submissions = getSubmissions();

  // Organize tags into parent categories.
  const categories = {
    Programming: ["Web Development", "Languages", "Software Tools"],
    Education: ["Learning", "Tutorials", "Courses"],
    Reference: ["Information", "Research"],
    Entertainment: ["Media", "Games"],
  };

  const [expandedCategory, setExpandedCategory] = useState("");

  const filteredSubmissions = submissions.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.description.toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      selectedTag === "" || (site.tags || []).includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  function getDescriptionPreview(description) {
    const sentences = description.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

    return sentences ? sentences.slice(0, 2).join(" ").trim() : description;
  }

  return (
    <div className="home-page">
      <header className="site-header">
        <Link to="/submissions" className="site-logo">
          Submissions Dashboard
        </Link>

        <input
          className="search-input"
          type="search"
          placeholder="Search submissions..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Link to="/dashboard" className="submit-button">
          Dashboard
        </Link>
      </header>

      <main className="home-content">
        <aside className="tag-sidebar">
          <h2>Browse by Category</h2>

          <button
            className={selectedTag === "" ? "selected" : ""}
            onClick={() => setSelectedTag("")}
          >
            All Submissions
          </button>

          {Object.entries(categories).map(([category, tags]) => (
            <div className="tag-category" key={category}>
              <button
                className="category-button"
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category ? "" : category,
                  )
                }
              >
                {category}
                <span>{expandedCategory === category ? "−" : "+"}</span>
              </button>

              {expandedCategory === category && (
                <div className="subcategory-list">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      className={selectedTag === tag ? "selected" : ""}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <section className="website-listings">
          <h1>Manage Submissions</h1>

          <div className="website-grid">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((site) => (
                <article
                  className="website-card curator-website-card"
                  key={site.id}
                >
                  <div className="website-preview">Website Preview</div>

                  <div className="website-card-content">
                    <h2>{site.name}</h2>

                    <p>{getDescriptionPreview(site.description)}</p>

                    <span className="submission-status">
                      Status: {site.status}
                    </span>

                    <p className="submission-date">
                      Submitted:{" "}
                      {new Date(site.submittedAt).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/submissions/${site.id}/review`}
                      className="edit-button"
                    >
                      Review
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <p>No submissions found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
