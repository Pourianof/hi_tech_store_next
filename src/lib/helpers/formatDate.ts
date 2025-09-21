export function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
}
