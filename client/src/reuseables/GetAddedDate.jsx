export const getAddedDate = (track) => {
  return new Date(track?.added_at).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
};
