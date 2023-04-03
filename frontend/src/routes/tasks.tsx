import { useState } from "react";
import Calendar from "../components/Calendar";
import Taskbar from "../components/Taskbar";
import TaskModal from "../components/TaskModal";
import TaskRow from "../components/TaskRow";
import "../styles/tasks.css";
import { status, priority, Task, estimate } from "../types";

export default function Tasks() {
  const initialTasks: Task[] = [
    {
      area_id: "1",
      id: crypto.randomUUID(),
      name: "my first task",
      status: status.later,
      estimate: 60,
      priority: priority.normal,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
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
      scheduled_on: new Date(2023, 2, 29, 3).toISOString(),
      estimate: 120,
      status: status.later,
      priority: priority.normal,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      area_id: "1",
      name: "Work",
      scheduled_on: new Date(2023, 2, 30, 7).toISOString(),
      status: status.later,
      estimate: 480,
      priority: priority.normal,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
  const createNewTask = (): Task => {
    return {
      id: crypto.randomUUID(),
      area_id: "1",
      name: "New TASK",
      estimate: estimate.one_hour,
      status: status.later,
      scheduled_on: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  };

  const firstTask = createNewTask();

  const [tasks, setTasks] = useState(initialTasks);
  const [dragTask, setDragTask] = useState({});
  const [activeTask, setActiveTask] = useState(firstTask);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (task: Task) => {
    const otherTasks = tasks.filter((x) => x.id != task.id);
    setTasks([...otherTasks, task]);
    setShowModal(false);
  };

  const editTaskSchedule = (task: Task) => {
    const otherTasks = tasks.filter((x) => x.id != task.id);
    setTasks([...otherTasks, task]);
  };

  const deleteTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => {
    e.stopPropagation();
    setTasks(tasks.filter((x) => x.id != task.id));
  };

  const handleNewTask = (status: status) => {
    const newTask = createNewTask();
    setShowModal(true);
    setActiveTask({ ...newTask, status: status });
  };

  const handleEditTask = (task: Task) => {
    setShowModal(true);
    setActiveTask(task);
  };

  return (
    <div id="tasks-page">
      <div className="tasks">
        <div className="task-list">
          <div className="task-header">
            <h1>NOW</h1>
            <div onClick={() => handleNewTask(status.next)}>+</div>
          </div>
          <ul className="tasklist">
            {tasks
              .filter((x) => x.status !== status.later)
              .map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  setDrag={setDragTask}
                  handleClick={handleEditTask}
                  handleDelete={deleteTask}
                />
              ))}
          </ul>
          <div className="task-header">
            <h1>LATER</h1>
            <div onClick={() => handleNewTask(status.later)}>+</div>
          </div>
          <ul className="tasklist">
            {tasks
              .filter((x) => x.status === status.later)
              .map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  setDrag={setDragTask}
                  handleClick={handleEditTask}
                  handleDelete={deleteTask}
                />
              ))}
          </ul>
        </div>
        {showModal && (
          <TaskModal currentTask={activeTask} onClose={handleEdit} />
        )}
        <Taskbar />
      </div>

      <Calendar
        dragTask={dragTask}
        events={tasks.filter((x) => x.scheduled_on != undefined)}
        setTask={editTaskSchedule}
      />
    </div>
  );
}
