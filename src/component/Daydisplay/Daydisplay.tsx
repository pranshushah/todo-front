import React from 'react';
import Styles from './Daydisplay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  format,
  isFuture,
  isToday,
  isTomorrow,
  isThisYear,
  isPast,
  isYesterday,
} from 'date-fns';
type dateProps = {
  date: Date;
  completed: boolean;
};

function Daydisplay({ date, completed }: dateProps) {
  let text = '';
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
  return (
    <span
      className={
        !completed && isPast(date)
          ? [Styles.due, Styles.overDue].join(' ')
          : !completed && isToday(date)
          ? [Styles.due, Styles.dueToday].join(' ')
          : Styles.due
      }>
      <FontAwesomeIcon icon={faCalendar} style={{ paddingRight: '4px' }} />
      {text}
    </span>
  );
}

export default Daydisplay;
