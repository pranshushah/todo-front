import React from 'react';
import { project } from '../../../../utils/types';
import projectImage from '../../../../utils/svg/list-bullet.svg';
import Styles from './ProjectItem.module.scss';
import { NavLink } from 'react-router-dom';

type projectItemProps = {
  project: project;
};

function ProjectItem({ project }: projectItemProps) {
  return (
    <li>
      <NavLink
        to={`/project/${project.id}`}
        className={Styles.container}
        activeClassName={Styles.active}
      >
        <div className={Styles.imgContainer}>
          <img className={Styles.img} src={projectImage} alt='' />
        </div>
        <span className={Styles.text}>{project.projectName}</span>
      </NavLink>
    </li>
  );
}

export default ProjectItem;
