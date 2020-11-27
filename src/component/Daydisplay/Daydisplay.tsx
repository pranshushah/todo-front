import React from 'react';
import Styles from './Daydisplay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { isToday, isPast } from 'date-fns';
import { getDateString } from '../../utils/helperFunction/getDateString';
type dateProps = {
  date: Date;
  completed: boolean;
};

function Daydisplay({ date, completed }: dateProps) {
  const text = getDateString(date);
  return (
    <span
      className={
        !completed && isPast(date)
          ? [Styles.due, Styles.overDue].join(' ')
          : !completed && isToday(date)
          ? [Styles.due, Styles.dueToday].join(' ')
          : Styles.due
      }
    >
      <FontAwesomeIcon icon={faCalendar} style={{ paddingRight: '4px' }} />
      {text}
    </span>
  );
}

export default Daydisplay;
