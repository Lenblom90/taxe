import { priority, estimate } from "../types";

export const estimateToString = (minutes: estimate | undefined) => {
  if (!Number.isInteger(minutes) || minutes === undefined) {
    return "";
  } else if (minutes < 119) {
    if (minutes < 59) {
      return `${minutes} minutes`;
    }
    return "1 hour";
  } else {
    return `${minutes / 60} hours`;
  }
};

export const priorityToString = (priority: priority | undefined) => {
  switch (priority) {
    case -2:
      return "lowest";
    case -1:
      return "low";
    case 0:
      return "normal";
    case 1:
      return "high";
    case 2:
      return "highest";
    default:
      return "";
  }
};

export const createdatToString = (ISOdateString: string) => {
  const age = Math.round(
    (Date.now() - Date.parse(ISOdateString)) / (1000 * 60 * 60 * 24)
  );

  return age + " DAY" + (age === 1 ? "" : "S") + " AGO";
};
