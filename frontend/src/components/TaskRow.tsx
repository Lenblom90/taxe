import { useState } from "react";
import { Task } from "../types";
import TaskForm from "./TaskForm";
import { Draggable } from "@fullcalendar/interaction";

export default function TaskRow({
  task,
  editTask,
}: {
  task: Task;
  editTask: any;
}) {
  const age = Math.round(
    (Date.now() - Date.parse(task.created_at)) / (1000 * 60 * 60 * 24)
  );
  const [isEditable, setEditable] = useState(false);

  const submitEdit = (task: Task) => {
    editTask(task);
    setTimeout(() => setEditable(false), 1000);
  };


  const form = <TaskForm initialTask={task} submitEdit={submitEdit} />;
  const row = (
    <li onClick={() => setEditable(!isEditable)} className="tasklist-item">
      <input type="checkbox"></input>
      <div>{task.note}</div>
      <div>{task.name}</div>
      <div className="estimate">{task.estimate?.toUpperCase()}</div>
      <div>{task.priority}</div>
      <div className="age">
        {age + " DAY" + (age === 1 ? "" : "S") + " AGO"}
      </div>
    </li>
  );

  return <>{isEditable ? form : row }</>;
}

document.addEventListener('DOMContentLoaded', () => {
  const tasks =  document.querySelectorAll('.tasklist-item');
  tasks.forEach((item) => new Draggable(item, {
    eventData: {
      title: 'event',
      duration: '02:00'

    }
    }
  ));
})
