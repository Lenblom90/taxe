import "../styles/Calendar.css";
import { useState } from "react";
import { DateTime, Duration } from "luxon";
import { Task } from "../types";

export default function Calendar({
  dragTask,
  events,
}: {
  dragTask: Task;
  events: Task[];
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

  console.table(todaysEvents);
  const hours = [];
  for (let index = 0; index < 24; index++) {
    const hourEvents = todaysEvents.filter(
      (x) => DateTime.fromISO(x.scheduled_on).hour == index
    );
    hours[index] = { hour: index, events: hourEvents };
  }

  const dropTask = (e) => {
    e.preventDefault();
  };

  const hourView = hours.map((x) => {
    return (
      <div className="hour" key={x.hour} onDrop={dropTask}>
        <div>{x.hour}</div>
        <div>{x.events[0]?.name}</div>
        <div>{x.events[1]?.name}</div>
        <div>{x.events[2]?.name}</div>
      </div>
    );
  });
  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <p>{date.toFormat("dd/MM/yyyy")}</p>
      <button onClick={() => setDate(date.minus({ days: 1 }))}>previous</button>
      <button onClick={() => setDate(date.plus({ days: 1 }))}>next</button>
      <div className="day">
        <div className="hours">{hourView}</div>
      </div>
    </div>
  );
}
