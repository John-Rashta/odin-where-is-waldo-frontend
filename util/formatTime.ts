const formatTime = function formatTimeForTimer(time: number) {
  const miliSpent = time;
  const seconds = Math.floor(miliSpent / 1000);
  const minutes = Math.floor(seconds / 60);
  const realSeconds = seconds % 60;
  const realMinutes = minutes % 60;
  const realMili = miliSpent % 1000;
  const finalMinutes = realMinutes.toString().padStart(2, "0");
  const finalSeconds = realSeconds.toString().padStart(2, "0");
  const finalMiliSeconds = realMili.toString().padStart(3, "0");

  const finalTime = `${finalMinutes}:${finalSeconds}:${finalMiliSeconds}`;
  return finalTime;
};

export { formatTime };
