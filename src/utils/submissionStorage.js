export function getSubmissions() {
  return JSON.parse(localStorage.getItem("website-index-submissions") || "[]");
}

export function saveSubmission(submission) {
  const submissions = getSubmissions();

  submissions.push(submission);

  localStorage.setItem(
    "website-index-submissions",
    JSON.stringify(submissions),
  );
}
