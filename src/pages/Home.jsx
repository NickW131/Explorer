import { useState } from "react";
import sampleWebsites from '../data/websites.js';
import { Link } from "react-router-dom";
import '../styles/home.css';
import '../styles/global.css';

export default function Home() {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState("");

    // Collect the available tags from the sample websites.
    const categories = {
        "Programming": [
            "Web Development",
            "Languages",
            "Software Tools"
        ],
        "Education": [
            "Learning",
            "Tutorials",
            "Courses"
        ],
        "Reference": [
            "Information",
            "Research"
        ],
        "Entertainment": [
            "Media",
            "Games"
        ]

    };

    const [expandedCategory, setExpandedCategory] = useState("");


    // Filter websites by search text and selected tag.
    const filteredWebsites = sampleWebsites.filter((site) => {
        const matchesSearch =
            site.name.toLowerCase().includes(search.toLowerCase()) ||
            site.description.toLowerCase().includes(search.toLowerCase());

        const matchesTag = selectedTag === "" || site.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    // Keep only the first two sentences for the homepage preview.
    function getDescriptionPreview(description) {
        const sentences = description.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

        return sentences ? sentences.slice(0, 2).join(" ").trim() : description;
    }

    return (
        <div className="home-page">

            <header className="site-header">
                <Link to="/" className="site-logo">
                    <span>Website Index </span>
                    <span className="site-logo-icon">⌕</span>
                </Link>

                <input
                    className="search-input"
                    type="search"
                    placeholder="⌕ Search websites..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <Link to="/submit" className="submit-button">
                    Submit Site
                </Link>
            </header>

            {/*Main Content*/}
            <main className="home-content">

                {/*Tag Sidebar*/}
                <aside className="tag-sidebar">
                    <h2>Browse by Category</h2>

                    <button className={selectedTag === "" ? "selected" : ""} onClick={() => setSelectedTag("")}>
                        All Websites
                    </button>

                    {Object.entries(categories).map(([category, tags]) => (
                        <div className="tag-category" key={category}>
                            <button
                                className="category-button"
                                onClick={() => setExpandedCategory(expandedCategory === category ? "" : category)}>
                                {category}
                                <span>{expandedCategory === category ? "−" : "+"}</span>
                            </button>

                            {expandedCategory === category && (
                                <div className="subcategory-list">
                                    {tags.map((tag) => (
                                        <button key={tag} className={selectedTag === tag ? "selected" : ""} onClick={() => setSelectedTag(tag)}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </aside>
                {/*Website Listings*/}
                <section className="website-listings">
                    <h1>Explore Websites</h1>

                    <div className="website-grid">
                        {filteredWebsites.length > 0 ? (
                            filteredWebsites.map((site) => (
                                <Link to={`/websites/${site.id}`} className="website-card" key={site.id}>
                                    <div className="website-preview">
                                        Website Preview
                                    </div>

                                    <div className="website-card-content">
                                        <h2>{site.name}</h2>

                                        <p>
                                            {getDescriptionPreview(site.description)}
                                        </p>

                                        <span className="details-prompt">
                                            Details →
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (<p>No websites found.</p>)
                        }
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="site-footer">
                <Link to="/about">About</Link>
                <Link to="/login">Curators Login</Link>
                <Link to="/contacts">Contacts</Link>
            </footer>

        </div>
    );
}