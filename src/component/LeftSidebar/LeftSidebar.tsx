import React from 'react';
import Styles from './LeftSidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { normalTasksMapper } from '../../selector/normalTasksMapper';
import { impTasksMapper } from '../../selector/impTasksMapper';
import { myDayTaskMapper } from '../../selector/myDayTaskMapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faHome } from '@fortawesome/free-solid-svg-icons';
import { faStar, faCalendar } from '@fortawesome/free-regular-svg-icons';

import { useRecoilValue } from 'recoil';
import AddProject from '../AddProject/AddProject';
import ProjectList from '../AddProject/ProjectList/ProjectList';
import { taskStatus } from '../../utils/types';
import { plannedTasksMapper } from '../../selector/plannedTaskMapper';
function LeftSidebar() {
  const inCompleteNormalTasksList = useRecoilValue(
    normalTasksMapper(taskStatus.inCompleted),
  );
  const inCompletePlannedTasksList = useRecoilValue(
    plannedTasksMapper(taskStatus.inCompleted),
  );
  const inCompleteImpTasksList = useRecoilValue(
    impTasksMapper(taskStatus.inCompleted),
  );
  const inCompleteMyDayTasksList = useRecoilValue(
    myDayTaskMapper(taskStatus.inCompleted),
  );
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
              <FontAwesomeIcon
                icon={faSun}
                className={Styles.icon}
                style={{ marginLeft: '2px' }}
              />
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
              <FontAwesomeIcon
                icon={faCalendar}
                className={Styles.icon}
                style={{ marginLeft: '1px' }}
              />
              <span className={Styles.text} style={{ marginLeft: '3px' }}>
                Planned
              </span>
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
