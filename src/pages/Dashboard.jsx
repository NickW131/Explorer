import { useState } from "react";
import { getWebsites } from "../utils/websiteStorage.js";
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/global.css";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();
  const websites = getWebsites();

  function handleLogout() {
    sessionStorage.removeItem("curatorLoggedIn");
    navigate("/login", { replace: true });
  }

  // Organize tags into parent categories.
  const categories = {
    Programming: ["Web Development", "Languages", "Software Tools"],
    Education: ["Learning", "Tutorials", "Courses"],
    Reference: ["Information", "Research"],
    Entertainment: ["Media", "Games"],
  };

  const [expandedCategory, setExpandedCategory] = useState("");

  // Filter websites by search text and selected tag.
  const filteredWebsites = websites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.description.toLowerCase().includes(search.toLowerCase());

    const matchesTag = selectedTag === "" || site.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Keep only the first two sentences for the card preview.
  function getDescriptionPreview(description) {
    const sentences = description.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

    return sentences ? sentences.slice(0, 2).join(" ").trim() : description;
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="site-header">
        <Link to="/dashboard" className="site-logo">
          Curator Dashboard
        </Link>

        <input
          className="search-input"
          type="search"
          placeholder="Search websites..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Link to="/submissions" className="submit-button">
          Submissions
        </Link>

        <button type="button" className="submit-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="home-content">
        {/* Tag Sidebar */}
        <aside className="tag-sidebar">
          <h2>Browse by Category</h2>

          <button
            className={selectedTag === "" ? "selected" : ""}
            onClick={() => setSelectedTag("")}
          >
            All Websites
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

        {/* Website Listings */}
        <section className="website-listings">
          <div className="dashboard-heading">
            <h1>Manage Websites</h1>

            <Link to="/manage/new" className="dashboard-add-button">
              + Add Website
            </Link>
          </div>

          <div className="website-grid">
            {filteredWebsites.length > 0 ? (
              filteredWebsites.map((site) => (
                <article
                  className="website-card curator-website-card"
                  key={site.id}
                >
                  <Link to={`/manage/${site.id}`} className="edit-button">
                    Edit
                  </Link>

                  <div className="website-preview">Website Preview</div>

                  <div className="website-card-content">
                    <h2>{site.name}</h2>

                    <p>{getDescriptionPreview(site.description)}</p>
                  </div>
                </article>
              ))
            ) : (
              <p>No websites found.</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <Link to="/about">About</Link>
        <Link to="/contacts">Contacts</Link>
      </footer>
    </div>
  );
}
