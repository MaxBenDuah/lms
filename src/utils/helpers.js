export const convertDate = (date) => {
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("de-DE", options).format(new Date(date));
};
