import "../styles/Calendar.css";
import { useState } from "react";
import { DateTime, Duration } from "luxon";
import { Task } from "../types";

export default function Calendar({
  dragTask,
  events,
  setTask,
}: {
  dragTask: Task;
  events: Task[];
  setTask: any;
}) {
  const [date, setDate] = useState(DateTime.now());
  const todaysEvents = events.filter((x) => {
    const eventDate = DateTime.fromISO(x.scheduled_on);
    return (
      eventDate.year == date.year &&
      eventDate.month == date.month &&
      eventDate.day == date.day
    );
  });

  const hours = [];
  for (let index = 0; index < 24; index++) {
    const hourEvents = todaysEvents.filter(
      (x) => DateTime.fromISO(x.scheduled_on).hour == index
    );
    hours[index] = { hour: index, events: hourEvents };
  }

  const dropTask = (task, hour) => {
    if (!task.scheduled_on) {
      task.scheduled_on = date.set({ hour: hour }).toISO();
    }
    task.scheduled_on = date.set({ hour: hour }).toISO();
    setTask(task);
  };

  const hourView = hours.map((x) => {
    return (
      <div
        className="hour"
        key={x.hour}
        onDrop={() => dropTask(dragTask, x.hour)}
      >
        <div className="hour-number">{x.hour}</div>
        <div className="hour-events">
          <div>{x.events[0]?.name}</div>
          <div>{x.events[1]?.name}</div>
          <div>{x.events[2]?.name}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="calendar">
      <div className="day">
        <div className="hours" onDragOver={(e) => e.preventDefault()}>
          {hourView}
        </div>
      </div>
      <div className="calendar-footer">
        <button>habit</button>
      </div>
    </div>
  );
}
