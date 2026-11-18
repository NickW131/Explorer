import sampleWebsites from "../data/websites.js";

export function getWebsites() {
  const overrides = JSON.parse(
    localStorage.getItem("website-index-overrides") || "{}",
  );

  const deleted = JSON.parse(
    localStorage.getItem("website-index-deleted") || "[]",
  );

  const originalWebsites = sampleWebsites.map(
    (site) => overrides[site.id] || site,
  );

  const newWebsites = Object.values(overrides).filter(
    (site) => !sampleWebsites.some((original) => original.id === site.id),
  );

  return [...originalWebsites, ...newWebsites].filter(
    (site) => !deleted.includes(site.id),
  );
}
