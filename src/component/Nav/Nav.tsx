import React from 'react';
import { useRecoilValue } from 'recoil';
import { loginDetailsState } from '../../atoms/loginDetailsAtom';
import Styles from './Nav.module.scss';

export function Nav() {
  const userDetails = useRecoilValue(loginDetailsState);
  return (
    <nav className={Styles.nav}>
      <ul className={Styles.navLinks}>
        <li className={Styles.NavLink}>
          <img
            className={Styles.logo}
            src={userDetails?.imageURL}
            alt='user logo'
          />
        </li>
        <li className={Styles.NavLink}>
          <a href='/api/logout' className={Styles.link}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
