import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSubmissions } from "../utils/submissionStorage.js";
import "../styles/reviewsubmission.css";
import "../styles/global.css";
import { getWebsites } from "../utils/websiteStorage.js";

export default function ReviewSubmission() {
  const navigate = useNavigate();
  const { id } = useParams();

  const submissions = getSubmissions();
  const submission = submissions.find((site) => site.id === id);

  const [name, setName] = useState(submission?.name || "");
  const [url, setUrl] = useState(submission?.url || "");
  const [description, setDescription] = useState(submission?.description || "");

  const [status, setStatus] = useState(submission?.status || "Pending");
  const [message, setMessage] = useState("");

  function handleSave(event) {
    event.preventDefault();

    const submissions = getSubmissions();

    const updatedSubmissions = submissions.map((site) =>
      site.id === id ? { ...site, name, url, description, status } : site,
    );

    localStorage.setItem(
      "website-index-submissions",
      JSON.stringify(updatedSubmissions),
    );

    setMessage("Submission changes saved.");
  }

  function handlePublish() {
    const websites = getWebsites();

    const normalizeUrl = (value) =>
      value.trim().replace(/\/+$/, "").toLowerCase();

    const duplicate = websites.some(
      (site) => normalizeUrl(site.url) === normalizeUrl(url),
    );

    if (status === "Approved") {
      setMessage("This submission has already been approved.");
      return;
    }

    if (status === "Rejected") {
      setMessage("A rejected submission cannot be published.");
      return;
    }

    if (duplicate) {
      setMessage("Cannot publish: this website URL already exists.");
      return;
    }

    const submissions = getSubmissions();

    const updatedSubmissions = submissions.map((site) =>
      site.id === id
        ? {
            ...site,
            name,
            url,
            description,
            status: "Approved",
            duplicateFlag: false,
          }
        : site,
    );

    localStorage.setItem(
      "website-index-submissions",
      JSON.stringify(updatedSubmissions),
    );

    const savedWebsites = JSON.parse(
      localStorage.getItem("website-index-overrides") || "{}",
    );

    const newId = Math.max(0, ...websites.map((site) => site.id)) + 1;

    savedWebsites[newId] = {
      id: newId,
      name,
      url,
      description,
      tags: [],
    };

    localStorage.setItem(
      "website-index-overrides",
      JSON.stringify(savedWebsites),
    );

    setStatus("Approved");
    setMessage("Submission approved and website published.");
  }

  function handleReject() {
    const confirmed = window.confirm(
      "Are you sure you want to reject this submission?",
    );

    if (!confirmed) return;

    if (status === "Approved") {
      setMessage("An approved submission cannot be rejected here.");
      return;
    }

    const submissions = getSubmissions();

    const updatedSubmissions = submissions.map((site) =>
      site.id === id
        ? {
            ...site,
            name,
            url,
            description,
            status: "Rejected",
          }
        : site,
    );

    localStorage.setItem(
      "website-index-submissions",
      JSON.stringify(updatedSubmissions),
    );

    setStatus("Rejected");
    setMessage("Submission rejected.");
  }

  if (!submission) {
    return (
      <main className="review-page">
        <h1>Submission Not Found</h1>
        <Link to="/submissions">← Back to Submissions</Link>
      </main>
    );
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
              <div className="review-preview">Website Preview</div>

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

                <label htmlFor="review-description">Website Description</label>
                <textarea
                  id="review-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
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

              {message && <p className="review-message">{message}</p>}
            </form>
          </section>

          <aside className="review-metadata">
            <Metadata label="Added By" value="Website User" />
            <Metadata label="Date Added" value="Not available" />

            <Metadata label="Status" value={status} />

            <Metadata
              label="Date Submitted"
              value={new Date(submission.submittedAt).toLocaleDateString()}
            />

            <Metadata
              label="Duplicate Status"
              value={submission.duplicateFlag ? "Flagged" : "Not flagged"}
            />

            <Metadata
              label="Reviewed By"
              value={status === "Pending" ? "Not reviewed" : "Current Curator"}
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
