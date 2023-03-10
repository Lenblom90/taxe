import { useState } from "react";
import { estimate, priority, status, Task } from "../types";
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
        completed_at: e.target.checked ? new Date().toISOString() : undefined,
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
      estimate: Number.parseInt(e.target.value),
    });
  };

  const handlePriorityChange = (e: any) => {
    setTask({
      ...task,
      priority: e.target.value,
    });
  };

  return (
    <div onSubmit={handleSubmit} className="task-form">
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-header">
          <input
            defaultChecked={!!task.completed_at}
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
              <option value={estimate.five_minutes}>5 minutes</option>
              <option value={estimate.ten_minutes}>10 minutes</option>
              <option value={estimate.fifteen_minutes}>15 minutes</option>
              <option value={estimate.twenty_minutes}>20 minutes</option>
              <option value={estimate.thirty_minutes}>30 minutes</option>
              <option value={estimate.fortyfive_minutes}>45 minutes</option>
              <option value={estimate.one_hour}>1 hour</option> 
              <option value={estimate.two_hours}>2 hours</option>
              <option value={estimate.four_hours}>4 hours</option>
              <option value={estimate.eight_hours}>8 hours</option>
            </select>
            <select
              value={task.priority}
              onChange={handlePriorityChange}
              name="taskPriority"
            >
              <option value={priority.lowest}>lowest</option>
              <option value={priority.low}>low</option>
              <option value={priority.normal}>normal</option>
              <option value={priority.high}>high</option>
              <option value={priority.highest}>highest</option>
            </select>
          </div>
          <div className="form-icons">
            <img src={pin} alt="pin-icon"></img>
            <img src={book} alt="book-icon"></img>
            <img src={hourglass} alt="hourglass-icon"></img>
            <img src={sundial} alt="sundial-icon"></img>
          </div>
          <TaskSchedule task={task}/>
          <TaskRepeat />
          <TaskTimer />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
