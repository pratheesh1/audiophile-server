import moment from "moment";

import * as datetime from "./datetime";

describe("datetime", () => {
  const mockedMoment = moment as jest.Mocked<typeof moment>;

  describe("formatDateTime function", () => {
    it("should return current date if no date is provided", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - testing invalid date
      const result = datetime.formatDateTime();
      expect(result).toBe(mockedMoment().format(datetime.defaultDateFormat));
    });

    it("should return current date if invalid date is provided", () => {
      const result = datetime.formatDateTime(new Date("invalid"));
      expect(result).toBe(mockedMoment().format(datetime.defaultDateFormat));
    });

    it("should return formatted date if valid date is provided", () => {
      const date = new Date();
      const result = datetime.formatDateTime(date);
      expect(result).toBe(mockedMoment(date).format(datetime.defaultDateFormat));
    });

    it("should return formatted date if valid date is provided and format is provided", () => {
      const date = new Date();
      const format = "YYYY";
      const result = datetime.formatDateTime(date, format);
      expect(result).toBe(mockedMoment(date).format(format));
    });
  });
});
