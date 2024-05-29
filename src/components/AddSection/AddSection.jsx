import React from "react";
import "./addSection-module.css";
import ActionButton from "../Action Button/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { addSection } from "../../redux/Features/section/Actions/sectionActions";
import Loading from "../Loading/Loading";
function AddSection({
  projectId,
  toggleHandler,
  editHandler,
  title,
  updateHandler,
}) {
  const [sectionTitle, setSectionTitle] = React.useState("");

  const isLoading = useSelector((state) => state.loading.isLoading);

  const dispatcher = useDispatch();

  function handleAddSection() {
    const sectionToAdd = {
      project_id: projectId,
      section_id: null,
      title: sectionTitle,
      tasks: [],
    };

    dispatcher(addSection(sectionToAdd));
    setSectionTitle("");
    toggleHandler();
  }

  function handleCancel() {
    setSectionTitle("");
    toggleHandler();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="addSection">
        <h2>{title ? "Update Section" : "Add Section"}</h2>
        <div className="inputSection">
          <input
            type="text"
            placeholder="Enter Section Title"
            value={title ? title : sectionTitle}
            onChange={
              title
                ? (e) => editHandler(e)
                : (e) => setSectionTitle(e.target.value)
            }
          />
        </div>
        <div className="addSectionButtons">
          <ActionButton
            buttonName={title ? "Update Section" : "Add Section"}
            buttonClass="addTask"
            eventHandler={title ? updateHandler : handleAddSection}
          />
          <ActionButton
            buttonName="Cancel"
            buttonClass="cancel"
            eventHandler={handleCancel}
          />
        </div>
      </div>
    </>
  );
}

export default AddSection;
