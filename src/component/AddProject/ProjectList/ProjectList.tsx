import React from 'react';
import { useRecoilValue } from 'recoil';
import { projects } from '../../../atoms/allProjectAtom';
import ProjectItem from './ProjectItem/ProjectItem';
function ProjectList() {
  const projectArray = useRecoilValue(projects);
  const projectLis = projectArray.map((project) => (
    <ProjectItem project={project} key={project.id} />
  ));
  return <ul style={{ listStyle: 'none' }}>{projectLis}</ul>;
}

export default ProjectList;
