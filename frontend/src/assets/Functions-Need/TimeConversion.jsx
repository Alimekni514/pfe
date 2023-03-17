function getTimeElapsed(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const timeElapsedMs = now - date;

  if (timeElapsedMs < 0) {
    return "in the future";
  }

  const timeElapsedMinutes = Math.floor(timeElapsedMs / 60000);
  if (timeElapsedMinutes < 60) {
    return `${timeElapsedMinutes} minutes ago`;
  }

  const timeElapsedHours = Math.floor(timeElapsedMinutes / 60);
  if (timeElapsedHours < 24) {
    return `${timeElapsedHours} hours ago`;
  }

  const timeElapsedDays = Math.floor(timeElapsedHours / 24);
  return `${timeElapsedDays} days ago`;
}

export { getTimeElapsed };
