import React from "react";
import "./addProject-module.css";
import ActionIconButton from "../Action Button/ActionIconButton";
import { useDispatch } from "react-redux";
import {
  addProject,
  updateProject,
} from "../../redux/Features/project/Actions/projectActions";
function AddProject({ toggleHandler, project }) {
  const [projectTitle, setProjectTitle] = React.useState(
    project ? project.title : ""
  );

  const dispatcher = useDispatch();

  function handleAddProject(e) {
    e.stopPropagation();
    const projectToAdd = {
      project_id: null,
      title: projectTitle,
    };
    dispatcher(addProject(projectToAdd));
    toggleHandler();
  }

  function handleCancel(e) {
    e.stopPropagation();
    toggleHandler();
  }

  function handleEditProject() {
    const projectToUpdate = {
      project_id: project.project_id,
      title: projectTitle,
    };
    dispatcher(
      updateProject({ id: project.project_id, projectObject: projectToUpdate })
    );
    toggleHandler();
  }

  return (
    <>
      <div className="addProjectContainer" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <div className="addProjectbuttonContainer">
          <ActionIconButton
            iconClass="fa-solid fa-check"
            buttonClass="addProjectButton"
            eventHandler={project ? handleEditProject : handleAddProject}
          />
          <ActionIconButton
            iconClass="fa-solid fa-xmark"
            buttonClass="addProjectButton cancel"
            eventHandler={handleCancel}
          />
        </div>
      </div>
    </>
  );
}

export default AddProject;
