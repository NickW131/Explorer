import { Link } from 'react-router-dom';
import '../styles/confirmation.css';
import '../styles/global.css';

export default function Confirmation() {
    return (
        <div className="submission-page">
            <header className="submission-header">
                <Link to="/" className="submission-logo">Website Index</Link>
            </header>

            <main className="confirmation-main">
                <section className="confirmation-panel">
                    <div className="confirmation-icon">✓</div>

                    <h1>Submission Received!</h1>

                    <p className="confirmation-message">
                        Thank you for submitting a website to Website Index.
                    </p>

                    <div className="confirmation-status">
                        <span>Submission Status:</span>
                        <strong>Pending Review</strong>
                    </div>

                    <p>
                        Your submission has been received and is waiting
                        for a curator to review it.
                    </p>

                    <p>
                        The website will not appear in the public directory
                        unless it is approved by a curator.
                    </p>

                    <Link to="/" className="submission-button">
                        Return to Home
                    </Link>
                </section>
            </main>

            <footer className="submission-footer">
                <Link to="/about">About</Link>
                <Link to="/contacts">Contacts</Link>
            </footer>
        </div>
    );
}