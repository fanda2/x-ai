export function formatTimeDifference(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
  
    if (months > 0) {
      return `${months} Months`;
    } else if (days > 0) {
      return `${days} Days`;
    } else if (hours > 0) {
      return `${hours} Hours`;
    } else if (minutes > 0) {
      return `${minutes} Minutes`;
    } else {
      return `${seconds} Seconds`;
    }
  }