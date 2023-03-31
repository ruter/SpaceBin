export const calcMilliseconds = (time: number, dateType: string) => {
  let date = new Date();
  const currentMilliseconds = date.getTime();
  if (dateType === "M") {
    date.setMonth(date.getMonth() + time);
  }
  if (dateType === "Y") {
    date.setFullYear(date.getFullYear() + time);
  }
  const futureMilliseconds = date.getTime();
  return futureMilliseconds - currentMilliseconds;
};

export const dtf = (date: Date) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(date);
