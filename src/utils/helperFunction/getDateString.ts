import {
  format,
  isFuture,
  isToday,
  isTomorrow,
  isThisYear,
  isYesterday,
} from 'date-fns';
export function getDateString(date: Date) {
  let text: string;
  if (isFuture(date)) {
    if (isToday(date)) {
      text = 'Due Today';
    } else if (isTomorrow(date)) {
      text = 'Due Tomorrow';
    } else {
      if (isThisYear(date)) {
        text = `due ${format(date, 'iii, MMMM d')}`;
      } else {
        text = `Overdue ${format(date, 'iii, MMMM d, yyyy')}`;
      }
    }
  } else {
    if (isYesterday(date)) {
      text = 'Overdue, Yesterday';
    } else if (isThisYear(date)) {
      text = `Overdue ${format(date, 'iii, MMMM d')}`;
    } else {
      text = `Overdue ${format(date, 'iii, MMMM d, yyyy')}`;
    }
  }
  return text;
}
