export const convertMilliseconds = (ms) => {
  const minutes = Math.floor((ms / 1000 / 60) % 60);

  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);

  if (hours === 0) {
    return `${minutes} min`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
};
