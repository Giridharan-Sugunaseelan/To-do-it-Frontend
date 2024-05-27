import { useState, useEffect } from "react";
import AddButton from "../AddButton/AddButton";
import "./project-module.css";
import Task from "../Task/Task";
import Section from "../Section/Section";
import formatDate from "../../util/formatDate";
import { fetchProject } from "../../redux/Features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { groupByDate } from "../../util/TaskGroupper";
import {
  deleteProjectTask,
  deleteTask,
  getProjectTasks,
  getTodayTasks,
} from "../../redux/Features/Tasks/Actions/taskActions";
import TaskInfo from "../TaskInfo/TaskInfo";
import AddSection from "../AddSection/AddSection";
import { getAllProjects } from "../../redux/Features/project/Actions/projectActions";
import { fetchProfilePicture } from "../../redux/Features/user/Actions/userActions";

function Project({ projectTitle }) {
  const dispatch = useDispatch();

  const projectState = useSelector((state) => state.project);

  const { project_id, title } = projectState;

  const tasks = useSelector((state) => state.project.tasks);

  const sections = useSelector((state) => state.project.sections);

  let filteredTasks;

  useEffect(() => {
    if (project_id) {
      localStorage.setItem("project_id", project_id);
    }
  });

  const todayDate = new Date();
  const todayDateString = todayDate.toISOString().split("T")[0];

  if (projectTitle === "today") {
    filteredTasks = tasks?.filter((task) => task.dueDate <= todayDateString);
  } else if (projectTitle === "upcoming") {
    filteredTasks = tasks?.filter((task) => task.dueDate > todayDateString);
  }

  let groupedTasks =
    projectTitle === "today" || projectTitle === "upcoming"
      ? groupByDate(filteredTasks, "dueDate")
      : groupByDate(tasks, "date");

  const [addTaskToggle, setAddTaskToggle] = useState(false);

  const [addSectionToggle, setAddSectionToggle] = useState(false);

  useEffect(() => {
    if (!project_id) {
      let projectId = localStorage.getItem("project_id");
      dispatch(fetchProject(projectId));
    }
    if (
      projectTitle === "today" ||
      projectTitle === "upcoming" ||
      projectTitle === undefined
    ) {
      dispatch(getTodayTasks());
    }
    dispatch(getAllProjects());
    dispatch(fetchProfilePicture());
  }, []);

  async function deleteTaskOfProject(id) {
    await dispatch(deleteProjectTask(id));
    await dispatch(getProjectTasks(project_id));
  }

  function deletetask(id) {
    dispatch(deleteTask(id));
  }

  function addTask() {
    setAddTaskToggle((prev) => !prev);
  }

  function addSection() {
    setAddSectionToggle((prev) => !prev);
  }

  function listTasks(tasks) {
    return Object?.entries(tasks)?.map(([date, taskList]) => {
      return (
        <>
          <div key={date}>
            <h2 className="date">{formatDate(date)}</h2>
            <ul className="tasks">
              {taskList?.map((task) => (
                <li key={task.task_id}>
                  <Task
                    task={task}
                    deleteHandler={
                      projectTitle === "today" || projectTitle === "upcoming"
                        ? deletetask
                        : deleteTaskOfProject
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    });
  }

  function listSections(sections) {
    return sections?.map((section) => {
      return (
        <li key={section?.section_id}>
          <Section section={section} />
        </li>
      );
    });
  }

  const project = (
    <div className="projectContainer">
      <div className="projectTitle">
        <h1>{title}</h1>
        <AddButton
          buttonClassName="addTask projectButton"
          buttonName={"Add Task"}
          eventHandler={addTask}
        />
      </div>
      <ul className="tasks">{listTasks(groupedTasks)}</ul>

      {addTaskToggle && (
        <div className="addTaskContainer">
          <TaskInfo projectId={project_id} cancelEventHandler={addTask} />
        </div>
      )}

      <ul className="sections">{listSections(sections)}</ul>
      <div className="addsection">
        {addSectionToggle && (
          <AddSection projectId={project_id} toggleHandler={addSection} />
        )}
      </div>
      <AddButton
        buttonName="Add Section"
        buttonClassName="addProjectSection"
        eventHandler={addSection}
      />
    </div>
  );

  const today = (
    <div className="projectContainer">
      <ul className="tasks">{listTasks(groupedTasks)}</ul>
    </div>
  );

  return (
    <>
      {projectTitle === "today" || projectTitle === "upcoming"
        ? today
        : project}
    </>
  );
}

export default Project;
