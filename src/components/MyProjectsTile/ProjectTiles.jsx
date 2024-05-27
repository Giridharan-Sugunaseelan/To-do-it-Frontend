import React from "react";
import ActionIconButton from "../Action Button/ActionIconButton";
import "./projectTiles-module.css";
import AddProject from "../AddProject/AddProject";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../redux/Features/project/Actions/projectActions";
import { useNavigate } from "react-router-dom";
import { fetchProject } from "../../redux/Features/project/projectSlice";
function ProjectTiles({ key, projectTitle, projectId }) {
  const [title, setTitle] = React.useState(projectTitle);
  const [editToggle, setEditToggle] = React.useState(false);
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  function handleClick(id, title) {
    dispatcher(fetchProject(id));
    navigator(`/${title}`);
  }

  function editProject() {
    setEditToggle((prev) => !prev);
  }

  function handleCancel() {
    setTitle("");
    editProject();
  }

  function handleDeleteProject(id) {
    dispatcher(deleteProject(id));
    navigator("/today");
  }

  let project = {
    project_id: projectId,
    title: title,
  };

  return (
    <>
      <li key={key} className="list">
        {editToggle ? (
          <AddProject toggleHandler={handleCancel} project={project} />
        ) : (
          <div className="projectTile">
            <button
              className="projectTilesButton"
              onClick={() => handleClick(projectId, title)}
            >
              {title}
            </button>
            <div className="projectTileButtonContainer">
              <ActionIconButton
                iconClass="fa-regular fa-pen-to-square"
                eventHandler={editProject}
              />
              <ActionIconButton
                iconClass="fa-solid fa-trash-can"
                eventHandler={() => handleDeleteProject(projectId)}
              />
            </div>
          </div>
        )}
      </li>
    </>
  );
}

export default ProjectTiles;
