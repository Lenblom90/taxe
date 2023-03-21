import { useState } from "react";
import Calendar from "../components/Calendar";
import Taskbar from "../components/Taskbar";
import TaskRow from "../components/TaskRow";
import "../styles/tasks.css";
import {
  status,
  priority,
  Task,
} from "../types";

export default function Tasks() {
  const initialTasks: Task[] = [
    {
      area_id: "1",
      id: crypto.randomUUID(),
      name: "my first task",
      status: status.later,
      estimate: 60,
      priority: priority.normal,
      created_at: new Date(Date.now()- 2 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      area_id: "1",
      id: crypto.randomUUID(),
      name: "Task no 2",
      status: status.started,
      estimate: 15,
      priority: priority.low,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { 
      area_id: "1", 
      id: crypto.randomUUID(), 
      name: "Party", 
      scheduled_on: new Date(2023,3,11,1).toISOString(), 
      estimate: 120, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString()},
    {
      area_id: "1", 
      id: crypto.randomUUID(), 
      name: "Work", scheduled_on: 
      new Date(2023,3,11,7).toISOString(), 
      estimate:480, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [dragTask, setDragTask] = useState(null);
  const events = tasks.filter(x => x.scheduled_on != undefined);

  const createTask = (status : status) => {
    const newTask = 
    {
      id: crypto.randomUUID(),
      area_id: "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: status,
      scheduled_on: undefined,
    }   
    setTasks([...tasks, newTask]);
  }

  const editTask = (task: Task) => {
    const otherTasks = tasks.filter(x => x.id != task.id);
    setTasks([...otherTasks, task]);
  };

  const deleteTask = (task: Task) => {
    setTasks(tasks.filter(x => x.id != task.id));
  }

  return (
    <div id="tasks-page">
      <div>
      <div className="task-header">
        <h1>NOW</h1>
        <div onClick={() => createTask(status.next)}>+</div>
      </div>
      <ul className="tasklist">{tasks.filter((x) => x.status !== status.later).map((task) => <TaskRow key={task.id} task={task} setDrag={setDragTask} handleEdit={editTask} handleDelete={deleteTask}/>)}</ul>
       <div className="task-header">
        <h1>LATER</h1>
        <div onClick={() => createTask(status.later)}>+</div>
      </div>
      <ul className="tasklist">{tasks.filter((x) => x.status === status.later).map((task) => <TaskRow key={task.id} task={task} setDrag={setDragTask} handleEdit={editTask} handleDelete={deleteTask} />)}</ul>
      </div>
      <Calendar dragTask={dragTask} events={events}/>
      <Taskbar />
    </div>
  );
}
