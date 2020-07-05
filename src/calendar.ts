import * as R from 'ramda';
import * as D from 'date-fns';

export const getWeekDays = ({
  weekStartsOn = 0,
  format = '',
  weekLength = 7
} = {}) => {
  const today = new Date();
  const difference = today.getDay() - weekStartsOn;
  const startDay = difference > 0 ?
    D.subDays(today, difference)
    : D.addDays(today, difference);
  return R.range(0, weekLength)
    .map((e: any, i: number) => D.addDays(startDay, i))
    .map((d: number | Date) => {
      if (format) {
        return D.format(d, format)
      } else {
        return d;
      }
    });
}

export const getNextMonths = ({
  from = new Date(),
  length = 12,
  inputFormat = 'YYYY-MM',
  outputFormat = ''
} = {}) => {
  const startFrom = D.format(from, inputFormat);
  return R.range(0, length)
    .map((e: number) => {
      return D.addMonths(new Date(startFrom), e);
    })
    .map((e: number | Date) => {
      if (outputFormat) {
        return D.format(e, outputFormat);
      } else {
        return e;
      }
    });
}

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMonthNumber = (monthName: string) => MONTH_NAMES.findIndex(e => e == monthName) + 1;
export const getMonthIndex = (monthName: string) => MONTH_NAMES.findIndex(e => e == monthName);

export const dateFromObj = (obj: { year: number; month: any; }) => {
  return new Date(obj.year, getMonthIndex(obj.month));
}

export const getYearMonthH = (date: number | Date) => {
  return D.format(date, 'YYYY-MM');
}

export const getYearMonthHFromObj = R.pipe(dateFromObj, getYearMonthH);


export const isWithinRangeTolerant = (day: number | Date, startDate: string | number | Date, endDate: string | number | Date) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  if (startDate.getTime() > endDate.getTime()) {
    console.error(`End Date ${endDate} is after Start Date ${startDate} !`);
    endDate = startDate;
  }
  return D.isWithinInterval(day, { start: startDate, end: endDate });
}