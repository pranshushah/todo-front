import React from 'react';
import Styles from './LeftSidebar.module.scss';
import { NavLink } from 'react-router-dom';
function LeftSidebar() {
  return (
    <div className={Styles.container}>
      <ul className={Styles.itemContainer}>
        <li>
          <NavLink
            className={[Styles.item, Styles.sun].join(' ')}
            to='/myday'
            activeClassName={Styles.active}
            exact>
            My Day
          </NavLink>
        </li>
        <li>
          <NavLink
            className={[Styles.item, Styles.star].join(' ')}
            to='/important'
            activeClassName={Styles.active}
            exact>
            Important
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/planned'
            className={[Styles.item, Styles.calendar].join(' ')}
            activeClassName={Styles.active}
            exact>
            Planned
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/tasks'
            exact
            className={[Styles.item, Styles.home].join(' ')}
            activeClassName={Styles.active}>
            Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
