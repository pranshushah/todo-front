import React from 'react';
import { project, taskStatus } from '../../../../utils/types';
import projectImage from '../../../../utils/svg/list-bullet.svg';
import Styles from './ProjectItem.module.scss';
import { NavLink } from 'react-router-dom';
import { tasksInGivenProject } from '../../../../selector/getTaskByProject';
import { useRecoilValue } from 'recoil';
type projectItemProps = {
  project: project;
};

function ProjectItem({ project: { id, projectName } }: projectItemProps) {
  const notification = useRecoilValue(
    tasksInGivenProject({ projectId: id, taskdone: taskStatus.inCompleted }),
  ).length;
  return (
    <li>
      <NavLink
        to={`/project/${id}`}
        className={Styles.container}
        activeClassName={Styles.active}
      >
        <div>
          <img className={Styles.img} src={projectImage} alt='' />
          <span className={Styles.text}>{projectName}</span>
        </div>
        <span className={Styles.notification}>
          {notification > 0 ? `${notification}` : ''}
        </span>
      </NavLink>
    </li>
  );
}

export default ProjectItem;
