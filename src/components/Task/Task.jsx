import React, { useEffect } from "react";
import "./task-module.css";
import "custom-input-aslam/build/index.css";
import ActionIconButton from "../Action Button/ActionIconButton";
import { useDispatch } from "react-redux";
import {
  updateProjectTask,
  updateProjectTaskStatus,
  updateSectionTask,
  updateSectionTaskStatus,
} from "../../redux/Features/Tasks/Actions/taskActions";
import TaskInfo from "../TaskInfo/TaskInfo";

function Task({ task, deleteHandler, editEventHandler }) {
  const [currentTask, setCurrentTask] = React.useState(task);

  const [isEditing, setIsEditing] = React.useState(false);

  function handleTitle(e) {
    setCurrentTask((prev) => ({ ...prev, title: e.target.value }));
  }

  function handleDescription(e) {
    setCurrentTask((prev) => ({ ...prev, description: e.target.value }));
  }

  function handleDueDate(e) {
    setCurrentTask((prev) => ({ ...prev, dueDate: e.target.value }));
  }

  function dispatchUpdate() {
    dispatcher(
      updateProjectTask({ id: currentTask.task_id, task: currentTask })
    );
    handleEdit();
  }

  function dispatchSectionUpdate() {
    dispatcher(
      updateSectionTask({ id: currentTask.task_id, task: currentTask })
    );
    handleEdit();
  }

  const editEventhandlers = {
    title: handleTitle,
    description: handleDescription,
    dueDate: handleDueDate,
    editHandler: handleEdit,
    dispatch: currentTask?.section_id ? dispatchSectionUpdate : dispatchUpdate,
  };

  const dispatcher = useDispatch();

  function handleCompleted() {
    if (task.section_id) {
      dispatcher(updateSectionTaskStatus(task.task_id));
    } else {
      dispatcher(updateProjectTaskStatus(task.task_id));
    }
    setCurrentTask((prev) => ({ ...prev, completed: !prev.completed }));
  }

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleDelete() {
    deleteHandler(currentTask.task_id);
  }

  let completed = currentTask.completed ? "completed" : "";

  const tasktile = (
    <div className={`taskContainer`}>
      <div className="tickbox">
        <div className={`taskContent ${completed}`}>
          <h4 className="taskTitle">{currentTask.title}</h4>
          <h5 className="taskDescription">{currentTask.description}</h5>
        </div>
      </div>
      <div className="taskButtonContainer">
        <ActionIconButton
          buttonClass="complete taskButton"
          iconClass="fa-solid fa-check"
          eventHandler={handleCompleted}
        />
        <ActionIconButton
          buttonClass="edit taskButton"
          iconClass="fa-regular fa-pen-to-square"
          eventHandler={handleEdit}
        />
        <ActionIconButton
          buttonClass="delete taskButton"
          iconClass="fa-solid fa-trash"
          eventHandler={handleDelete}
        />
      </div>
    </div>
  );

  const editTile = (
    <TaskInfo
      task={currentTask}
      editEventHandlers={editEventhandlers}
      edit={editEventHandler}
    />
  );

  return <>{isEditing ? editTile : tasktile}</>;
}

export default Task;