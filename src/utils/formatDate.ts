import { Dayjs } from "dayjs";

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const formatDate = (date: Dayjs) => {
  const day = date.daysInMonth();
  const month = MONTHS[date.month()];
  const hours = date.hour();
  const minutes = date.minute();
  const seconds = date.second();
  
  return `${day} ${month} в ${hours}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }:${seconds < 10 ? `0${seconds} ` : `${seconds}`}`;
};
