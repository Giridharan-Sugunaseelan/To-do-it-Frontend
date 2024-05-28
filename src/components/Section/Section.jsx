import React from "react";
import Task from "../Task/Task";
import "./section-module.css";
import formatDate from "../../util/formatDate";
import { groupByDate } from "../../util/TaskGroupper";
import {
  deleteSectionTask,
  getSectionTasks,
} from "../../redux/Features/Tasks/Actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import TaskInfo from "../TaskInfo/TaskInfo";
import ActionIconButton from "../Action Button/ActionIconButton";
import AddSection from "../AddSection/AddSection";
import {
  deleteSection,
  updateSection,
} from "../../redux/Features/section/Actions/sectionActions";
function Section({ section }) {
  const sections = useSelector((state) => state.project.sections);

  const currentSection = sections?.find(
    (sec) => sec?.section_id === section?.section_id
  );

  const [addTaskToggle, setAddTaskToggle] = React.useState(false);

  const [counter, setCounter] = React.useState(0);

  const [editSectionToggle, setEditSectionToggle] = React.useState(false);

  const [title, setTitle] = React.useState(currentSection?.title);

  const groupedTasks = groupByDate(currentSection?.tasks, "date");

  const dispatcher = useDispatch();

  function addTask() {
    setAddTaskToggle((prev) => !prev);
    setCounter((prev) => prev + 1);
  }

  async function deleteTaskOfSection(id) {
    await dispatcher(deleteSectionTask(id));
    await dispatcher(getSectionTasks(currentSection?.section_id));
  }

  function editSection() {
    setEditSectionToggle((prev) => !prev);
  }

  function handleEdit(e) {
    setTitle(e.target.value);
  }

  function handleUpdateSection() {
    const sectionToUpdate = {
      project_id: currentSection?.project_id,
      section_id: currentSection?.section_id,
      title: title,
      tasks: currentSection?.tasks,
    };

    dispatcher(
      updateSection({
        id: currentSection?.section_id,
        sectionObject: sectionToUpdate,
      })
    );
    setEditSectionToggle((prev) => !prev);
  }

  function handleDelete() {
    dispatcher(deleteSection(currentSection?.section_id));
  }

  return (
    <div className="sectionContainer">
      {editSectionToggle ? (
        <AddSection
          toggleHandler={editSection}
          title={title}
          editHandler={handleEdit}
          updateHandler={handleUpdateSection}
        />
      ) : (
        <div className="sectionTitle">
          <h2 className="title">{title}</h2>
          <div className="actionButtons">
            <ActionIconButton
              buttonClass="sectionTitleButton"
              iconClass="fa-solid fa-plus"
              eventHandler={addTask}
            />
            <ActionIconButton
              buttonClass="sectionTitleButton"
              iconClass="fa-regular fa-pen-to-square"
              eventHandler={editSection}
            />
            <ActionIconButton
              buttonClass="sectionTitleButton"
              iconClass="fa-solid fa-trash-can"
              eventHandler={handleDelete}
            />
          </div>
        </div>
      )}
      <hr />
      {Object.entries(groupedTasks).map(([date, taskList]) => (
        <div key={date}>
          <h2 className="date">{formatDate(date)}</h2>
          <ul className="tasks">
            {taskList.map((task) => (
              <li key={task.task_id}>
                <Task
                  task={task}
                  sectionId={currentSection.section_id}
                  deleteHandler={deleteTaskOfSection}
                  editEventHandler={editSection}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      {addTaskToggle && (
        <div className="addTaskContainer">
          <TaskInfo
            cancelEventHandler={addTask}
            sectionId={currentSection?.section_id}
          />
        </div>
      )}
    </div>
  );
}
export default Section;
