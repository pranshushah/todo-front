import React, { useRef, useEffect } from 'react';
import Styles from './DueDateMenu.module.scss';
import { endOfToday, endOfTomorrow, format } from 'date-fns';

type projectMenu = {
  show: boolean;
  onClickOutside: () => void;
  onAddTodayClick: () => Promise<void>;
  onAddTommorrowClick: () => Promise<void>;
};

function DueDateMenu({
  show,
  onClickOutside,
  onAddTodayClick,
  onAddTommorrowClick,
}: projectMenu) {
  const menuRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    function clickOutSideHandler(e: MouseEvent) {
      //@ts-ignore
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', clickOutSideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutSideHandler);
    };
  }, [onClickOutside]);

  return show ? (
    <ul className={Styles.dropdownMenu} ref={menuRef}>
      <li className={Styles.content} onClick={onAddTodayClick}>
        Today
        <span className={Styles.date}>{format(endOfToday(), 'EEE')}</span>
      </li>
      <li className={Styles.content} onClick={onAddTommorrowClick}>
        Tommorrow
        <span className={Styles.date}>{format(endOfTomorrow(), 'EEE')}</span>
      </li>
    </ul>
  ) : null;
}

export default DueDateMenu;
