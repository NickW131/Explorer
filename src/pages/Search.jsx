import { useState } from "react";
import { Link } from "react-router-dom";
import { getWebsites } from "../utils/websiteStorage.js";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const websites = getWebsites();

  const allTags = [...new Set(websites.flatMap((site) => site.tags))];

  const filteredWebsites = websites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === "All" || site.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  function getDescriptionPreview(description) {
    const sentences = description.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
    return sentences.slice(0, 2).join(" ");
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="site-header">
        <Link to="/">Website Index</Link>

        <input
          type="text"
          className="search-input"
          placeholder="Search websites..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search websites"
        />

        <Link to="/submit">Submit Site</Link>
      </header>

      {/* Main content */}
      <main className="home-content">
        {/* Tag sidebar */}
        <aside className="tag-sidebar">
          <h2>Tags</h2>

          <button
            onClick={() => setSelectedTag("All")}
            aria-pressed={selectedTag === "All"}
          >
            All Websites
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </aside>

        {/* Search results */}
        <section className="website-listings">
          <h1>Search Websites</h1>

          <p>Showing {filteredWebsites.length} website(s)</p>

          {filteredWebsites.length > 0 ? (
            <div className="website-grid">
              {filteredWebsites.map((site) => (
                <Link
                  to={`/websites/${site.id}`}
                  className="website-card"
                  key={site.id}
                >
                  <div className="website-preview">Website Preview</div>

                  <div className="website-card-content">
                    <h2>{site.name}</h2>

                    <p>{getDescriptionPreview(site.description)}</p>

                    <span className="details-prompt">Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>
              No websites found. Try another search or select a different tag.
            </p>
          )}
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

export default Search;
