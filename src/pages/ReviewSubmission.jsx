import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/reviewsubmission.css';
import '../styles/global.css';

export default function ReviewSubmission() {
    const navigate = useNavigate();

    // Temporary example submission data
    const [name, setName] = useState('freeCodeCamp');
    const [url, setUrl] = useState('https://www.freecodecamp.org');
    const [description, setDescription] = useState('Free online programming courses and tutorials.');

    const [status, setStatus] = useState('Pending');
    const [message, setMessage] = useState('');

    function handleSave(event) {
        event.preventDefault();
        setMessage('Submission changes saved in this demo.');
    }

    function handlePublish() {
        setStatus('Approved');
        setMessage('Submission approved in this demo.');
    }

    function handleReject() {
        const confirmed = window.confirm(
            'Are you sure you want to reject this submission?'
        );

        if (confirmed) {
            setStatus('Rejected');
            setMessage('Submission rejected in this demo.');
        }
    }

    return (
        <div className="review-page">
            <header className="review-header">
                <Link to="/dashboard" className="review-logo">
                    Website Index
                </Link>

                <button
                    type="button"
                    className="review-publish-button"
                    onClick={handlePublish}
                >
                    Publish
                </button>
            </header>

            <main className="review-main">
                <div className="review-heading">
                    <Link to="/submissions" className="review-back-button">
                        ← Back to Submissions
                    </Link>

                    <h1>Submission Review</h1>
                </div>

                <div className="review-layout">
                    <section className="review-editor">
                        <form onSubmit={handleSave}>
                            <div className="review-preview">
                                Website Preview
                            </div>

                            <div className="review-fields">
                                <label htmlFor="review-name">Website Name</label>
                                <input
                                    id="review-name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />

                                <label htmlFor="review-url">Website URL</label>
                                <input
                                    id="review-url"
                                    type="url"
                                    value={url}
                                    onChange={(event) => setUrl(event.target.value)}
                                    required
                                />

                                <label htmlFor="review-description">
                                    Website Description
                                </label>
                                <textarea
                                    id="review-description"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    rows={5}
                                    required
                                />
                            </div>

                            <section className="review-tags-section">
                                <h2>Website Tags</h2>
                                <p>Tags can be assigned when the submission is approved.</p>
                            </section>

                            <div className="review-actions">
                                <button type="submit" className="review-save-button">
                                    Save
                                </button>

                                <button
                                    type="button"
                                    className="review-reject-button"
                                    onClick={handleReject}
                                >
                                    Reject Submission
                                </button>
                            </div>

                            {message && (
                                <p className="review-message">{message}</p>
                            )}
                        </form>
                    </section>

                    <aside className="review-metadata">
                        <Metadata label="Added By" value="Website User" />
                        <Metadata label="Date Added" value="Not available" />

                        <Metadata label="Status" value={status} />

                        <Metadata label="Date Submitted" value="October 31, 2026"/>

                        <Metadata label="Duplicate Status" value="Not flagged"/>

                        <Metadata label="Reviewed By"
                            value={status === 'Pending' ? 'Not reviewed' : 'Current Curator'}
                        />
                    </aside>
                </div>
            </main>
        </div>
    );
}

function Metadata({ label, value }) {
    return (
        <div className="review-metadata-item">
            <label>{label}</label>
            <div>{value}</div>
        </div>
    );
}
