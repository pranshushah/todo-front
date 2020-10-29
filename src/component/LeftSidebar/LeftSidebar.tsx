import React from 'react';
import Styles from './LeftSidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { inCompleteNormalTasks } from '../../selector/inCompleteNormalTasks';
import { inCompletePlannedTasks } from '../../selector/inCompletePlannedTasks';
import { inCompleteImpTasks } from '../../selector/inCompleteImpTasks';
import { useRecoilValue } from 'recoil';
function LeftSidebar() {
  const inCompleteNormalTasksList = useRecoilValue(inCompleteNormalTasks);
  const inCompletePlannedTasksList = useRecoilValue(inCompletePlannedTasks);
  const inCompleteImpTasksList = useRecoilValue(inCompleteImpTasks);
  return (
    <div className={Styles.container}>
      <ul className={Styles.itemContainer}>
        <li>
          <NavLink
            className={Styles.item}
            to='/myday'
            activeClassName={Styles.active}
            exact>
            <i
              aria-hidden='true'
              className={['fa', 'fa-sun-o', Styles.icon].join(' ')}>
              <span className={Styles.text}>My Day</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={Styles.item}
            to='/important'
            activeClassName={Styles.active}
            exact>
            <i
              className={['fa', 'fa-star-o', Styles.icon].join(' ')}
              aria-hidden='true'>
              <span className={Styles.text}>Important</span>
            </i>
            <span className={Styles.notification}>
              {inCompleteImpTasksList.length > 0
                ? `${inCompleteImpTasksList.length}`
                : ''}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/planned'
            className={Styles.item}
            activeClassName={Styles.active}
            exact>
            <i
              className={['fa', 'fa-calendar', Styles.icon].join(' ')}
              aria-hidden='true'>
              <span className={Styles.text}>Planned</span>
            </i>
            <span className={Styles.notification}>
              {inCompletePlannedTasksList.length > 0
                ? `${inCompletePlannedTasksList.length}`
                : ''}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/tasks'
            exact
            className={Styles.item}
            activeClassName={Styles.active}>
            <i
              className={['fa', 'fa-home', Styles.icon].join(' ')}
              aria-hidden='true'>
              <span className={Styles.text}>Tasks</span>
            </i>
            <span className={Styles.notification}>
              {inCompleteNormalTasksList.length > 0
                ? `${inCompleteNormalTasksList.length}`
                : ''}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
