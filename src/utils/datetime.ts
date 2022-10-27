import moment from "moment";

const defaultDateFormat = "YYYY_MM_DD";

export const formatDateTime = (date: Date, format: string = defaultDateFormat): string => {
  return moment(date).format(format);
};
