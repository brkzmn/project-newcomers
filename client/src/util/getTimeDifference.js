const getTimeDifference = (currentTime, publishingTime) => {
  const unitmapping = {
    days: 24 * 60 * 60 * 1000,
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
  };

  const diff = Math.floor(currentTime - publishingTime);
  if (diff / unitmapping.days > 0) {
    return `${Math.floor(diff / unitmapping.days)}  days ago`;
  } else if (diff / unitmapping.hours > 0) {
    return `${Math.floor(diff / unitmapping.hours)} hours ago`;
  } else {
    return `${Math.floor(diff / unitmapping.minutes)} minutes ago`;
  }
};

export default getTimeDifference;
