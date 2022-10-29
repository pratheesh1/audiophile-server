import moment from "moment";

export const defaultDateFormat = "YYYY_MM_DD";

export const formatDateTime = (date: Date, format: string = defaultDateFormat): string => {
  if (!date || !moment(date).isValid()) return moment().format(format);
  return moment(date).format(format);
};
