import sampleWebsites from "../data/websites.js";

export function getWebsites() {
  const overrides = JSON.parse(
    localStorage.getItem("website-index-overrides") || "{}",
  );

  const deleted = JSON.parse(
    localStorage.getItem("website-index-deleted") || "[]",
  );

  return sampleWebsites
    .filter((site) => !deleted.includes(site.id))
    .map((site) => overrides[site.id] || site);
}
