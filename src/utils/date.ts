import dayjs from "dayjs";

export function getFormattedDate(date: string | number | Date, format = "YYYY-MM-DD") {
	return dayjs(date).format(format);
}
