import React, { useRef, useEffect } from 'react';
import Styles from './ProjectMenu.module.scss';
type projectMenu = {
  show: boolean;
  onClickOutside: () => void;
  onClickDelete?: () => Promise<void>;
};

function ProjectMenu({ show, onClickOutside, onClickDelete }: projectMenu) {
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
      <li className={Styles.content}>Rename List</li>
      <li
        className={[Styles.content, Styles.contentDanger].join(' ')}
        onClick={onClickDelete}
      >
        Delete List
      </li>
    </ul>
  ) : null;
}

export default ProjectMenu;
