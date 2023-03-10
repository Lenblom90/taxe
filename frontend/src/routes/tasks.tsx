import { useState } from "react";
import Calendar from "../components/Calendar";
import Taskbar from "../components/Taskbar";
import TaskList from "../components/TaskList";
import "../styles/tasks.css";
import {
  status,
  priority,
  motivation,
  eisenhower,
  Task,
  grouping,
  sorting,
} from "../types";

export default function Tasks() {
  const initialTasks: Task[] = [
    {
      area_id: "1",
      id: crypto.randomUUID(),
      name: "my first task",
      status: status.later,
      estimate: "10 minutes",
      priority: priority.normal,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      area_id: "1",
      id: crypto.randomUUID(),
      name: "Task no 2",
      status: status.started,
      estimate: "15 minutes",
      priority: priority.low,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [dragTask, setDragTask] = useState(null);
  return (
    <div id="tasks-page">
      <TaskList
        workflow={{
          name: "now/later",
          group: grouping.nowLater,
          sort: sorting.urgency,
        }}
        tasks={tasks}
        setTasks={setTasks}
        setDrag={setDragTask}
      />
      <Calendar dragTask={dragTask}/>
      <Taskbar />
    </div>
  );
}
