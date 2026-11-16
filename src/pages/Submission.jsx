import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sampleWebsites from '../data/websites.js';
import '../styles/submission.css';
import '../styles/global.css';


export default function Submission() {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const normalizedUrl = url.trim().replace(/\/+$/, '').toLowerCase();

        const isDuplicate = sampleWebsites.some((site) => {
            const existingUrl = site.url
                .trim()
                .replace(/\/+$/, '')
                .toLowerCase();

            return existingUrl === normalizedUrl;
        });

        navigate('/confirmation', {
            state: { duplicateFlag: isDuplicate }
        });
    }

    return (
        <div className="submission-page">
            <header className="submission-header">
                <Link to="/" className="submission-logo">
                    Website Index
                </Link>
            </header>

            <main className="submission-main">
                <div className="submission-layout">
                    <section className="submission-panel">
                        <h1>Submit a Website</h1>
                        <p>Found a useful website? Suggest it for our directory!</p>

                        <form className="submission-form" onSubmit={handleSubmit}>
                            <label htmlFor="website-name">Website Name</label>
                            <input
                                id="website-name"
                                type="text"
                                placeholder="Enter website name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                maxLength={150}
                                required
                            />

                            <label htmlFor="website-url">Website URL</label>
                            <input
                                id="website-url"
                                type="url"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                                required
                            />

                            <label htmlFor="website-description">
                                Website Description
                            </label>
                            <textarea
                                id="website-description"
                                placeholder="Describe what this website offers..."
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                rows={5}
                                required
                            />

                            <button type="submit">Submit Website</button>
                        </form>
                    </section>

                    <aside className="submission-info">
                        <h2>Submission Info</h2>
                        <ol>
                            <li>Do not submit pages from a site. Please only submit the main page from a site.</li>
                            <li>Please write a descriptive description for your submission.</li>
                            <li>Legal action will be taken against users submitting illegal sites.</li>
                            <li>Do not submit sites owned by you. Please contact us if you are the owner of a site and wish to add it to the collection.</li>
                            <li>This is not meant to be used as an FAQ or to report issues with the site. Please contact us in this case or see the FAQ at the bottom of the page.</li>
                            <li>Spam will be rejected.</li>
                            <li>Check to see if the site you want added is already part of the collection.</li>
                        </ol>
                    </aside>
                </div>
            </main>

            <footer className="submission-footer">
                <Link to="/about">About</Link>
                <Link to="/contacts">Contacts</Link>
            </footer>
        </div>
    );
}
