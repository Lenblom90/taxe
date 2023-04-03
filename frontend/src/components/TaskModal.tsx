import { FormEvent, useState } from "react";
import { Task, status, estimate, priority } from "../types";
import TaskRepeat from "./TaskRepeat";
import TaskSchedule from "./TaskSchedule";
import TaskTimer from "./TaskTimer";
import pin from "../assets/Pin.svg";
import book from "../assets/Book.svg";
import sundial from "../assets/Sundial.svg";
import hourglass from "../assets/Hourglass.svg";
export default function TaskModal({
  currentTask,
  onClose,
}: {
  currentTask: Task;
  onClose: (task: Task) => void;
}) {
  const [task, setTask] = useState(currentTask);
  const [scheduler, setScheduler] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [timer, setTimer] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose(task);
  };

  const handleClose = (e) => {
    if (e.target.className === "task-modal") {
      onClose(task);
    }
  };

  return (
    <div className="task-modal" onClick={(e) => handleClose(e)}>
      <form
        className="task-form"
        method="post"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="form-header">
          <input
            defaultChecked={!!task.completed_at}
            onChange={(e) =>
              setTask({
                ...task,
                completed_at: e.target.checked
                  ? new Date().toISOString()
                  : undefined,
              })
            }
            type="checkbox"
          ></input>
          <input
            id="taskName"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            type="text"
          ></input>
          <div>
            created on {new Date(Date.parse(task.created_at)).toDateString()}
          </div>
        </div>
        <div className="form-body">
          <textarea
            value={task.note}
            onChange={(e) => setTask({ ...task, note: e.target.value })}
            name="taskDescription"
            placeholder="description...."
          ></textarea>
          <TaskSchedule
            handleSchedule={(scheduled_on: string) =>
              setTask({ ...task, scheduled_on: scheduled_on })
            }
            show={scheduler}
            scheduled_day={task.scheduled_on}
          />
          <TaskRepeat show={repeat} />
          <TaskTimer show={timer} />
        </div>
        <div className="form-footer">
          <div className="form-options">
            <select
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
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
              onChange={(e) =>
                setTask({
                  ...task,
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
              value={task.priority}
              onChange={(e) =>
                setTask({
                  ...task,
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
        <button onClick={() => onClose(task)} type="button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
