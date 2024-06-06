import React, { useEffect } from "react";
import "./task-module.css";
import "custom-input-aslam/build/index.css";
import ActionIconButton from "../Action Button/ActionIconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProjectTask,
  updateProjectTaskStatus,
  updateSectionTask,
  updateSectionTaskStatus,
} from "../../redux/Features/Tasks/Actions/taskActions";
import TaskInfo from "../TaskInfo/TaskInfo";
import Loading from "../Loading/Loading";

function Task({ task, deleteHandler, editEventHandler }) {
  const tasks = useSelector((state) => state.project.tasks);

  const sections = useSelector((state) => state.project.sections);

  let presentTask;

  useEffect(() => {
    let presentTask;
    if (!task.section_id) {
      presentTask = tasks?.find((ttask) => ttask.task_id === task.task_id);
    } else {
      sections?.forEach((section) => {
        if (section.section_id === task.section_id) {
          const foundTask = section.tasks.find(
            (section_task) => section_task.task_id === task.task_id
          );
          if (foundTask) {
            presentTask = foundTask;
          }
        }
      });
    }
    setCurrentTask(presentTask);
  }, [task, tasks, sections]);

  const [currentTask, setCurrentTask] = React.useState(presentTask);

  const [isEditing, setIsEditing] = React.useState(false);

  const isLoading = useSelector((state) => state.loading.isLoading);

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
      updateProjectTask({ id: currentTask?.task_id, task: currentTask })
    );
    handleEdit();
  }

  function dispatchSectionUpdate() {
    dispatcher(
      updateSectionTask({ id: currentTask?.task_id, task: currentTask })
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
      dispatcher(updateSectionTaskStatus(task?.task_id));
    } else {
      dispatcher(updateProjectTaskStatus(task?.task_id));
    }
    setCurrentTask((prev) => ({ ...prev, completed: !prev?.completed }));
  }

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleDelete() {
    deleteHandler(currentTask?.task_id);
  }

  let completed = currentTask?.completed ? "completed" : "";

  const tasktile = (
    <div className={`taskContainer`}>
      <div className="tickbox">
        <div className={`taskContent ${completed}`}>
          <h4 className="taskTitle">{currentTask?.title}</h4>
          <h5 className="taskDescription">{currentTask?.description}</h5>
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

  if (isLoading) {
    return <Loading />;
  }

  return <>{isEditing ? editTile : tasktile}</>;
}

export default Task;
