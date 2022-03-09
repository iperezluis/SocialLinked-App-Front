import moment from "moment";

export const getHours = (date: number) => {
  const fecha = moment(date);
  return fecha.format("HH:mm a | MMM Do");
};
