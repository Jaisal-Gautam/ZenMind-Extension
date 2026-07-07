export default function parseDomain(url) {
  try {
    const hostname = new URL(
      url.startsWith("http")
        ? url
        : `https://${url}`
    ).hostname;

    return hostname
      .replace(/^www\./, "")
      .replace(/^m\./, "");
  } catch {
    return url;
  }
}
