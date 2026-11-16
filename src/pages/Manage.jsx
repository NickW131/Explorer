import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import sampleWebsites from '../data/websites.js';
import '../styles/manage.css';
import '../styles/global.css';

export default function Manage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const website = sampleWebsites.find((site) => site.id === Number(id));

    const [name, setName] = useState(website?.name || '');
    const [url, setUrl] = useState(website?.url || '');
    const [description, setDescription] = useState(website?.description || '');

    const [tags, setTags] = useState(website?.tags || []);
    const [newTag, setNewTag] = useState('');
    const [message, setMessage] = useState('');

    //Might need to change this.
    const availableTags = [
        ...new Set(sampleWebsites.flatMap((site) => site.tags))
    ];

    if (!website) {
        return (
            <main className="manage-page">
                <h1>Website Not Found</h1>
                <Link to="/dashboard">Back to Dashboard</Link>
            </main>
        );
    }

    function removeTag(tagToRemove) {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    function addTag() {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    }

    function handleSave(event) {
        event.preventDefault();

        const savedWebsites = JSON.parse(localStorage.getItem('website-index-overrides') || '{}');

        savedWebsites[website.id] = {
            ...website,
            name,
            url,
            description,
            tags
        };

        localStorage.setItem('website-index-overrides', JSON.stringify(savedWebsites));

        setMessage('Changes saved in this browser.');
    }

    function handleDelete() {
        const confirmed = window.confirm('Are you sure you want to delete this website?');

        if (!confirmed) return;

        const deletedWebsites = JSON.parse(localStorage.getItem('website-index-deleted') || '[]');

        if (!deletedWebsites.includes(website.id)) {
            deletedWebsites.push(website.id);
        }

        localStorage.setItem('website-index-deleted', JSON.stringify(deletedWebsites));

        navigate('/dashboard');
    }

    return (
        <div className="manage-page">
            <header className="manage-header">
                <Link to="/" className="manage-logo">
                    Website Index
                </Link>

                <button
                    type="button"
                    className="manage-publish-button"
                    onClick={handleSave}>
                    Publish
                </button>
            </header>

            <main className="manage-main">
                <div className="manage-heading">
                    <Link to="/dashboard" className="manage-back-button">
                        ← Back
                    </Link>

                    <h1>Manage Website</h1>
                </div>

                <div className="manage-layout">
                    <section className="manage-editor">
                        <form onSubmit={handleSave}>
                            <div className="manage-editor-content">
                                <div className="manage-preview">
                                    Website Preview
                                </div>

                                <div className="manage-fields">
                                    <label htmlFor="manage-name">Website Name</label>
                                    <input
                                        id="manage-name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required/>

                                    <label htmlFor="manage-url">Website URL</label>
                                    <input
                                        id="manage-url"
                                        type="url"
                                        value={url}
                                        onChange={(event) => setUrl(event.target.value)}
                                        required/>

                                    <label htmlFor="manage-description">
                                        Website Description
                                    </label>
                                    <textarea
                                        id="manage-description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        rows={5}
                                        required
                                    />
                                </div>

                                <div className="manage-tags-section">
                                    <h2>Website Tags</h2>

                                    <div className="manage-tags">
                                        {tags.map((tag) => (
                                            <span className="manage-tag" key={tag}>
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    aria-label={`Remove ${tag}`}>
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>

                                    <div className="manage-add-tag">
                                        <select value={newTag} onChange={(event) => setNewTag(event.target.value)}>
                                            <option value="">Choose a tag</option>
                                            {availableTags
                                                .filter((tag) => !tags.includes(tag))
                                                .map((tag) => (
                                                    <option key={tag} value={tag}>
                                                        {tag}
                                                    </option>
                                                ))}
                                        </select>

                                        <button type="button" onClick={addTag}>
                                            + Add Tag
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="manage-actions">
                                <button type="submit" className="manage-save-button">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="manage-cancel-button"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Cancel
                                </button>
                            </div>

                            {message && (<p className="manage-message">{message}</p>)}
                        </form>
                    </section>

                    <aside className="manage-metadata">
                        <Metadata label="Added By" value="Curator" />
                        <Metadata label="Date Added" value="Not available" />
                        <Metadata label="Status" value="Published" />
                        <Metadata label="Date Submitted" value="Not available" />
                        <Metadata label="Duplicate Status" value="Not checked" />
                        <Metadata label="Reviewed By" value="Curator" />
                    </aside>
                </div>

                <button
                    type="button"
                    className="manage-delete-button"
                    onClick={handleDelete}
                >
                    ♧ Delete Website
                </button>
            </main>
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
