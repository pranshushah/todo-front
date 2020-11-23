import React from 'react';
import { project } from '../../../../utils/types';
import projectImage from '../../../../utils/svg/list-bullet.svg';
import Styles from './ProjectItem.module.scss';

type projectItemProps = {
  project: project;
};

function ProjectItem({ project }: projectItemProps) {
  return (
    <li className={Styles.container}>
      <div className={Styles.imgContainer}>
        <img className={Styles.img} src={projectImage} alt='' />
      </div>
      <span className={Styles.text}>{project.projectName}</span>
    </li>
  );
}

export default ProjectItem;
