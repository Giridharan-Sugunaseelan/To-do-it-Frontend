import React from "react";
import ActionIconButton from "../Action Button/ActionIconButton";
import "./myProjectTile-module.css";
import { useSelector } from "react-redux";
import AddProject from "../AddProject/AddProject";
import ProjectTiles from "./ProjectTiles";
function MyProjectsTile() {
  const projects = useSelector((state) => state.project.projects);

  const [addProjectToggle, setAddProjectToggle] = React.useState(false);

  function addProject(event) {
    setAddProjectToggle((prev) => !prev);
    event.stopPropagation();
  }

  function projectList(projects) {
    return (
      <>
        {projects?.map(({ project_id, title }) => {
          return (
            <ProjectTiles
              key={project_id}
              projectTitle={title}
              projectId={project_id}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="project">
        <div className="myProjectTile">
          My Projects
          <ActionIconButton
            iconClass="fa-solid fa-plus"
            buttonClass="projectTitleButton"
            eventHandler={addProject}
          />
        </div>
        <ul className="projectTiles">{projectList(projects)}</ul>
        {addProjectToggle && <AddProject toggleHandler={addProject} />}
      </div>
    </>
  );
}

export default MyProjectsTile;
