import moment from "moment";

export function formatDatewithTime24hourFormat(date) {
  return moment(date).format("DD/MM/YYYY HH:mm");
}
