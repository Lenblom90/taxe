import { Link } from "react-router-dom";
import { Task, grouping, sorting, status } from "../types";

export default function TaskList({
  tasks,
  workflow,
}: {
  tasks: Array<Task>;
  workflow: { name: string; group: grouping; sort: string };
}) {
  let group = grouping.none;
  let sort = sorting.urgency;

  if (workflow.name === "simple") {
    group = grouping.nowLater;
    sort = sorting.urgency;
  } else if (workflow.name === "kanban") {
    group = grouping.byStatus;
    sort = sorting.priority;
  } else if (workflow.name === "must/should/want") {
    group = grouping.byMotivation;
    sort = sorting.urgency;
  } else if (workflow.name === "eisenhower") {
    group = grouping.Eisenhower;
    sort = sorting.urgency;
  }

  const now = tasks
    .filter((x) => x.status !== status.later)
    .map((task) => {
      const age = Math.round(
        (Date.now() - Date.parse(task.created_at)) / (1000 * 60 * 60 * 24)
      );

      return (
        <li key={task.id} className="tasklist-item">
          <Link to={`tasks/${task.id}`}>
            <input type="checkbox"></input>
            <div>{task.note}</div>
            <div>{task.name}</div>
            <div className="estimate">{task.estimate + " MINUTES"}</div>
            <div>{task.priority}</div>
            <div>{age}</div>
          </Link>
        </li>
      );
    });

  const later = tasks
    .filter((x) => x.status === status.later)
    .map((task) => {
      return (
        <li key={task.id} className="tasklist-item">
          <Link to={`tasks/${task.id}`}>
            <input type="checkbox"></input>
            <div>{task.note}</div>
            <div>{task.name}</div>
            <div>{task.estimate + " MINUTES"}</div>
            <div>{task.priority}</div>
            <div>{task.created_at}</div>
          </Link>
        </li>
      );
    });

  return (
    <div>
      <div className="task-header">
        <h1>NOW</h1>
        <div>+</div>
      </div>
      <ul className="tasklist">{now}</ul>
      <div className="task-header">
        <h1>LATER</h1>
        <div>+</div>
      </div>
      <ul className="tasklist">{later}</ul>
    </div>
  );
}
