import React from "react";
import ActionButton from "../Action Button/ActionButton";
import "./taskInfo-module.css";
import { useDispatch } from "react-redux";
import {
  addProjectTask,
  addSectionTask,
} from "../../redux/Features/Tasks/Actions/taskActions";
function TaskInfo({
  projectId,
  cancelEventHandler,
  task,
  editEventHandlers,
  sectionId,
  edit,
}) {
  const dispatcher = useDispatch();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function validate() {
    if (!title) {
      setErrorMessage("Enter Task Title");
      return false;
    } else if (!dueDate) {
      setErrorMessage("Set Due Date");
    } else {
      return true;
    }
  }

  function handleCancel() {
    setTitle("");
    setDescription("");
    setDueDate("");
    cancelEventHandler();
  }
  function handleAddProjectTask() {
    const taskToAdd = {
      project_id: projectId,
      task_id: null,
      title: title,
      description: description,
      completed: false,
      date: null,
      dueDate: dueDate,
    };

    if (validate()) {
      dispatcher(addProjectTask(taskToAdd));
      setTitle("");
      setDescription("");
      setDueDate("");
      cancelEventHandler();
    }
  }

  function handleAddSectionTask() {
    const taskToAdd = {
      section_id: sectionId,
      task_id: null,
      title: title,
      description: description,
      completed: false,
      date: null,
      dueDate: dueDate,
    };

    if (validate()) {
      dispatcher(addSectionTask(taskToAdd));
      setTitle("");
      setDescription("");
      setDueDate("");
      cancelEventHandler();
    }
  }

  function updateTask() {
    editEventHandlers.dispatch;
    editEventHandlers.editHandler;
  }

  return (
    <>
      <div className="infoContainer">
        <div className="taskInfoContainer">
          <input
            type="text"
            placeholder="Task title"
            value={task ? task.title : title}
            onChange={
              task
                ? (e) => editEventHandlers.title(e)
                : (e) => setTitle(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Task Description"
            value={task ? task.description : description}
            onChange={
              task
                ? (e) => editEventHandlers.description(e)
                : (e) => setDescription(e.target.value)
            }
          />
          <div className="taskParameters">
            <div className="dateContainer">
              <label htmlFor="dueDate" className="dueDateLabel">
                Due Date:
              </label>
              <input
                type="date"
                id="dueDate"
                placeholder="Due Date"
                value={task ? task.dueDate : dueDate}
                onChange={
                  task
                    ? (e) => editEventHandlers.dueDate(e)
                    : (e) => setDueDate(e.target.value)
                }
              />
            </div>
            <div className="addTaskbuttons">
              {task ? (
                <ActionButton
                  buttonName="Update Task"
                  buttonClass="addTask"
                  eventHandler={updateTask}
                />
              ) : (
                <ActionButton
                  buttonName="Add Task"
                  buttonClass="addTask"
                  eventHandler={
                    sectionId ? handleAddSectionTask : handleAddProjectTask
                  }
                />
              )}
              <ActionButton
                buttonName="Cancel"
                buttonClass="cancel"
                eventHandler={
                  task ? editEventHandlers.editHandler : handleCancel
                }
              />
            </div>
          </div>
          {errorMessage && (
            <p
              style={{
                color: "red",
                paddingLeft: "10px",
                margin: "0px",
                paddingTop: "10px",
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskInfo;
