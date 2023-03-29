import { FormEvent, useState } from "react";
import {
  createdatToString,
  estimateToString,
  priorityToString,
} from "../lib/TaskHelperMethods";
import { Task, status, priority, estimate } from "../types";
import "../styles/Taskrow.css";
import pin from "../assets/Pin.svg";
import book from "../assets/Book.svg";
import sundial from "../assets/Sundial.svg";
import hourglass from "../assets/Hourglass.svg";
import TaskSchedule from "./TaskSchedule";
import TaskRepeat from "./TaskRepeat";
import TaskTimer from "./TaskTimer";
export default function TaskRow({
  task,
  handleEdit,
  handleDelete,
  setDrag,
}: {
  task: Task;
  handleEdit: any;
  handleDelete: any;
  setDrag: any;
}) {
  const [editable, setEditable] = useState(false);
  const [currentTask, setTask] = useState(task);
  const [scheduler, setScheduler] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [timer, setTimer] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEdit(currentTask);
    setEditable(false);
  };

  if (editable) {
    return (
      <div className="task-form">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-header">
            <input
              defaultChecked={!!task.completed_at}
              onChange={(e) =>
                setTask({
                  ...currentTask,
                  completed_at: e.target.checked
                    ? new Date().toISOString()
                    : undefined,
                })
              }
              type="checkbox"
            ></input>
            <input
              id="taskName"
              value={currentTask.name}
              onChange={(e) =>
                setTask({ ...currentTask, name: e.target.value })
              }
              type="text"
            ></input>
            <div>
              created on {new Date(Date.parse(task.created_at)).toDateString()}
            </div>
          </div>
          <div className="form-body">
            <textarea
              value={currentTask.note}
              onChange={(e) =>
                setTask({ ...currentTask, note: e.target.value })
              }
              name="taskDescription"
              placeholder="description...."
            ></textarea>
            <TaskSchedule
              handleSchedule={(scheduled_on: string) =>
                setTask({ ...currentTask, scheduled_on: scheduled_on })
              }
              show={scheduler}
              scheduled_day={currentTask.scheduled_on}
            />
            <TaskRepeat show={repeat} />
            <TaskTimer show={timer} />
          </div>
          <div className="form-footer">
            <div className="form-options">
              <select
                value={currentTask.status}
                onChange={(e) =>
                  setTask({ ...currentTask, status: e.target.value })
                }
                name="taskStatus"
              >
                <option>{status.later}</option>
                <option>{status.next}</option>
                <option>{status.started}</option>
                <option>{status.waiting}</option>
                <option>{status.completed}</option>
              </select>
              <select
                value={currentTask.estimate}
                onChange={(e) =>
                  setTask({
                    ...currentTask,
                    estimate: Number.parseInt(e.target.value),
                  })
                }
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
                value={currentTask.priority}
                onChange={(e) =>
                  setTask({
                    ...currentTask,
                    priority: Number.parseInt(e.target.value),
                  })
                }
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
              <img src={pin} alt="pin-icon" />
              <img
                onClick={() => setScheduler(!scheduler)}
                src={book}
                alt="book-icon"
              />
              <img
                onClick={() => setTimer(!timer)}
                src={hourglass}
                alt="hourglass-icon"
              />
              <img
                onClick={() => setRepeat(!repeat)}
                src={sundial}
                alt="sundial-icon"
              />
            </div>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  } else {
    return (
      <li
        draggable={true}
        onDragStart={() => setDrag(task)}
        onClick={() => setEditable(true)}
        className="tasklist-item"
      >
        <input type="checkbox" checked={!!task.completed_at} readOnly></input>
        <div>{task.note}</div>
        <div>{task.name}</div>
        <div className="estimate">{estimateToString(task.estimate)}</div>
        <div>{priorityToString(task.priority)}</div>
        <div className="age">{createdatToString(task.created_at)}</div>
        <button onClick={() => handleDelete(task)}>del</button>
      </li>
    );
  }
}
