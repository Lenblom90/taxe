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
  const updateTask = (task: Task) => {
    const updatedTasks = tasks.map((x) => {
      if (x.id === task.id) {
        x = task;
      }
      return x;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter((x) => x.id !== id);
    setTasks(remainingTasks);
  };

  const newTask: (
    area_id: string,
    name?: string,
    note?: null,
    status?: status,
    estimate?: number,
    priority?: priority,
    motivation?: motivation,
    eisenhower?: eisenhower,
    source?: string,
    source_id?: string,
    scheduled_on?: string,
    completed_at?: string
  ) => Task = (
    area_id = crypto.randomUUID(),
    name?,
    note?,
    status?,
    estimate?,
    priority?,
    motivation?,
    eisenhower?,
    source?,
    source_id?,
    scheduled_on?,
    completed_at?
  ) => {
    const task = {
      id: crypto.randomUUID(),
      area_id: area_id,
      name: name,
      note: note,
      status: status,
      previous_status: null,
      estimate: estimate,
      priority: priority,
      motivation: motivation,
      eisenhower: eisenhower,
      sources: [
        {
          source: source,
          source_id: source_id,
        },
      ],
      scheduled_on: scheduled_on,
      completed_at: completed_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    };
    return task;
  };

  const initialTasks = [
    newTask(
      crypto.randomUUID(),
      "my first task",
      null,
      status.later,
      10,
      priority.normal,
      motivation.unknown,
      eisenhower.none,
      "site",
      "1",
      new Date().toISOString(),
      new Date().toISOString()
    ),
    newTask(
      crypto.randomUUID(),
      "Task no 2",
      null,
      status.started,
      15,
      priority.low,
      motivation.want,
      eisenhower.none,
      undefined,
      undefined,
      new Date().toISOString(),
      new Date().toISOString()
    ),
  ];

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div id="tasks-page">
      <TaskList
        workflow={{
          name: "now/later",
          group: grouping.nowLater,
          sort: sorting.urgency,
        }}
        tasks={tasks}
      />
      <Calendar />
      <Taskbar />
    </div>
  );
}
