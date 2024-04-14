import { Dayjs } from "dayjs";

export const formatTime = (time: Dayjs): string => {
  const hours = time.hour();
  const minutes = time.minute();
  const seconds = time.second();

  return `${hours > 0 ? hours + " ч" : ""} ${
    minutes > 0 ? (minutes < 10 ? `0${minutes} мин` : `${minutes} мин`) : ""
  } ${seconds > 0 ? (seconds < 10 ? `0${seconds} сек` : `${seconds} сек`) : ""}`;
};
