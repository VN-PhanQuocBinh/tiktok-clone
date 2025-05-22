function getTimeAgo(dateString) {
   const createdTime = new Date(dateString.replace(" ", "T")); // chuyển "2025-02-06 11:08:37" => "2025-02-06T11:08:37"
   const now = new Date();
   const diffMs = now - createdTime;
   const diffSeconds = Math.floor(diffMs / 1000);
   const diffMinutes = Math.floor(diffSeconds / 60);
   const diffHours = Math.floor(diffMinutes / 60);
   const diffDays = Math.floor(diffHours / 24);

   if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
   if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
   if (diffHours < 24) return `${diffHours} hours ago`;
   if (diffDays < 30) return `${diffDays} days ago`;

   const diffMonths = Math.floor(diffDays / 30);
   if (diffMonths < 12) return `${diffMonths} months ago`;

   const diffYears = Math.floor(diffMonths / 12);
   return `${diffYears} years ago`;
}

export default getTimeAgo;
