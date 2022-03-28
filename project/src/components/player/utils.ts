export const getTimeFromSeconds = (seconds: number) => {
  const timeLeft = [];
  if(seconds > 3600) {
    timeLeft.push(Math.floor(seconds / 3600));
  }
  timeLeft.push(Math.floor((seconds % 3600) / 60));
  timeLeft.push(seconds % 60);
  return timeLeft.map((t) => [t < 10 ? '0' : '', t].join('')).join(':');
};
