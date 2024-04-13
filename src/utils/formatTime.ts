import { Dayjs } from "dayjs";

export const formatTime = (time: Dayjs): string => {
  const hours = time.hour();
  const minutes = time.minute();
  const seconds = time.second();
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
