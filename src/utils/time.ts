export const timeAgo = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)
  const seconds = now - timestamp;

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;

  return new Date(timestamp * 1000).toLocaleDateString(); // Nếu quá lâu thì hiện ngày
};
