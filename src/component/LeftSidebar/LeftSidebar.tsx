import React from 'react';
import Styles from './LeftSidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { inCompleteNormalTasks } from '../../selector/inCompleteNormalTasks';
import { inCompletePlannedTasks } from '../../selector/inCompletePlannedTasks';
import { inCompleteImpTasks } from '../../selector/inCompleteImpTasks';
import { inCompleteMyDayTasks } from '../../selector/InCompleteMydayTasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faHome } from '@fortawesome/free-solid-svg-icons';
import { faStar, faCalendar } from '@fortawesome/free-regular-svg-icons';

import { useRecoilValue } from 'recoil';
import AddProject from '../AddProject/AddProject';
import ProjectList from '../AddProject/ProjectList/ProjectList';
function LeftSidebar() {
  const inCompleteNormalTasksList = useRecoilValue(inCompleteNormalTasks);
  const inCompletePlannedTasksList = useRecoilValue(inCompletePlannedTasks);
  const inCompleteImpTasksList = useRecoilValue(inCompleteImpTasks);
  const inCompleteMyDayTasksList = useRecoilValue(inCompleteMyDayTasks);
  return (
    <section className={Styles.container}>
      <ul className={Styles.itemContainer}>
        <li>
          <NavLink
            className={Styles.item}
            to='/myday'
            activeClassName={Styles.active}
            exact
          >
            <div>
              <FontAwesomeIcon icon={faSun} className={Styles.icon} />
              <span className={Styles.text}>My Day</span>
            </div>
            <span className={Styles.notification}>
              {inCompleteMyDayTasksList.length > 0
                ? `${inCompleteMyDayTasksList.length}`
                : ''}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={Styles.item}
            to='/important'
            activeClassName={Styles.active}
            exact
          >
            <div>
              <FontAwesomeIcon icon={faStar} className={Styles.icon} />
              <span className={Styles.text}>Important</span>
            </div>
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
            exact
          >
            <div>
              <FontAwesomeIcon icon={faCalendar} className={Styles.icon} />
              <span className={Styles.text}>Planned</span>
            </div>
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
            activeClassName={Styles.active}
          >
            <div>
              <FontAwesomeIcon icon={faHome} className={Styles.icon} />
              <span className={Styles.text}>Tasks</span>
            </div>
            <span className={Styles.notification}>
              {inCompleteNormalTasksList.length > 0
                ? `${inCompleteNormalTasksList.length}`
                : ''}
            </span>
          </NavLink>
        </li>
      </ul>
      <ProjectList />
      <AddProject />
    </section>
  );
}

export default LeftSidebar;
