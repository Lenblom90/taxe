import { Task, grouping, sorting, status, priority } from "../types";
import TaskRow from "./TaskRow";
import { Draggable } from '@fullcalendar/interaction';

export default function TaskList({
  tasks,
  workflow,
  setTasks,
}: {
  tasks: Task[];
  workflow: { name: string; group: grouping; sort: string };
  setTasks: any;
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


  const newTask = (newStatus: status) => {
    setTasks([
      ...tasks,
      {
        area_id: "1",
        id: crypto.randomUUID(),
        name: "",
        status: newStatus,
        priority: priority.normal,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  };

  const editTask = (task: Task) => {
    const temp = tasks.map((x) => {
      return x.id === task.id ? task : x;
    });
    setTasks(temp);
  };

  const now = tasks
    .filter((x) => x.status !== status.later)
    .map((task) => <TaskRow key={task.id} task={task} editTask={editTask} />);

  const later = tasks
    .filter((x) => x.status === status.later)
    .map((task) => <TaskRow key={task.id} task={task} editTask={editTask} />);

  return (
    <div>
      <div className="task-header">
        <h1>NOW</h1>
        <div onClick={() => newTask(status.next)}>+</div>
      </div>
      <ul className="tasklist">{now}</ul>
      <div className="task-header">
        <h1>LATER</h1>
        <div onClick={() => newTask(status.later)}>+</div>
      </div>
      <ul className="tasklist">{later}</ul>
    </div>
  );
}
