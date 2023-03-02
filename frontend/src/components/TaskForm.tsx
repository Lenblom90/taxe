import { useState } from "react";
import { priority, status, Task } from "../types";
import "../styles/Taskform.css";
import pin from "../assets/Pin.svg";
import book from "../assets/Book.svg";
import sundial from "../assets/Sundial.svg";
import hourglass from "../assets/Hourglass.svg";
import TaskSchedule from "./TaskSchedule";
import TaskRepeat from "./TaskRepeat";
import TaskTimer from "./TaskTimer";

export default function TaskForm({
  initialTask,
  submitEdit,
}: {
  initialTask: Task;
  submitEdit: any;
}) {
  const [task, setTask] = useState(initialTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTask({
      ...task,
      updated_at: new Date().toISOString(),
    });
    submitEdit(task);
  };

  const handleCompletedChange = (e: any) => {
    setTask({
      ...task,
      completed_at: new Date().toISOString(),
    });
  };

  const handleNameChange = (e: any) => {
    setTask({
      ...task,
      name: e.target.value,
    });
  };

  const handleNoteChange = (e: any) => {
    setTask({
      ...task,
      note: e.target.value,
    });
  };

  const handleStatusChange = (e: any) => {
    setTask({
      ...task,
      status: e.target.value,
    });
  };

  const handleEstimateChange = (e: any) => {
    setTask({
      ...task,
      estimate: e.target.value,
    });
  };

  const handlePriorityChange = (e: any) => {
    setTask({
      ...task,
      priority: e.target.value,
    });
  };

  return (
    <div onMouseLeave={handleSubmit} className="task-form">
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-header">
          <input
            checked={!!task.completed_at}
            onChange={handleCompletedChange}
            type="checkbox"
          ></input>
          <input
            id="taskName"
            value={task.name}
            onChange={handleNameChange}
            type="text"
          ></input>
          <div>created</div>
        </div>
        <textarea
          value={task.note}
          onChange={handleNoteChange}
          name="taskDescription"
          placeholder="description...."
        ></textarea>
        <div className="form-footer">
          <div className="form-options">
            <select
              value={task.status}
              onChange={handleStatusChange}
              name="taskStatus"
            >
              <option>{status.later}</option>
              <option>{status.next}</option>
              <option>{status.started}</option>
              <option>{status.waiting}</option>
              <option>{status.completed}</option>
            </select>
            <select
              value={task.estimate}
              onChange={handleEstimateChange}
              name="taskEstimate"
            >
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>20 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
            <select
              value={task.priority}
              onChange={handlePriorityChange}
              name="taskPriority"
            >
              <option>{priority.lowest}</option>
              <option>{priority.low}</option>
              <option>{priority.normal}</option>
              <option>{priority.high}</option>
              <option>{priority.highest}</option>
            </select>
          </div>
          <div className="form-icons">
            <img src={pin} alt="pin-icon"></img>
            <img src={book} alt="book-icon"></img>
            <img src={hourglass} alt="hourglass-icon"></img>
            <img src={sundial} alt="sundial-icon"></img>
          </div>
          <TaskSchedule />
          <TaskRepeat />
          <TaskTimer />
        </div>
      </form>
    </div>
  );
}
