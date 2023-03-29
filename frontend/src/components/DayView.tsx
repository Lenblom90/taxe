import { DateTime } from "luxon";
import { useState } from "react";
import { Task } from "../types";

export default function DayView({
  date,
  setView,
  events,
  dragTask,
  scheduleTask,
}: {
  date: DateTime;
  setView: any;
  events: Task[];
  dragTask: Task;
  scheduleTask: any;
}) {
  const [hours, setHours] = useState([
    { date: date, hour: 1, events: [] },
    { date: date, hour: 2, events: [] },
    { date: date, hour: 3, events: [] },
    { date: date, hour: 4, events: [] },
    { date: date, hour: 5, events: [] },
    { date: date, hour: 6, events: [] },
    { date: date, hour: 7, events: [] },
    { date: date, hour: 8, events: [] },
    { date: date, hour: 9, events: [] },
    { date: date, hour: 10, events: [] },
    { date: date, hour: 11, events: [] },
    { date: date, hour: 12, events: [] },
    { date: date, hour: 13, events: [] },
    { date: date, hour: 14, events: [] },
    { date: date, hour: 15, events: [] },
    { date: date, hour: 16, events: [] },
    { date: date, hour: 17, events: [] },
    { date: date, hour: 18, events: [] },
    { date: date, hour: 19, events: [] },
    { date: date, hour: 20, events: [] },
    { date: date, hour: 21, events: [] },
    { date: date, hour: 23, events: [] },
  ]);
  const onDrop = (e) => {
    e.target.textContent = dragTask.name;

    //scheduleTask(dragTask, hour);
  };

  events.forEach((event) => {
    const eventDate = DateTime.fromISO(event.scheduled_on);
    if (
      eventDate.year == date.year &&
      eventDate.month == date.month &&
      eventDate.day == date.day
    ) {
      const eventHour = hours.find((x) => x.hour == eventDate.hour);
      console.log(eventHour);

      setHours([
        ...hours.filter((x) => x.hour != eventDate.hour),
        { date: date },
      ]);
    }
  });

  const times = hours.map((hour) => {
    return (
      <div
        onDragOver={(e) => onDragOver(e)}
        onDrop={(event) => onDrop(event)}
        key={hour.hour}
        className="day-row"
      >
        <div className="day-hour">{hour.hour}</div>
        <div className="day-event" hidden={!hour.events[0]}>
          {hour.events[0] ? hour.events[0] : null}
        </div>
      </div>
    );
  });

  const onDragOver = (e: Event) => e.preventDefault();

  return (
    <div className="calendar">
      <div className="cal-header">
        <div className="cal-nav">
          <button onClick={() => setView("month")}>Month</button>
          <button onClick={() => setView("week")}>Week</button>
          <button onClick={() => setView("day")}>Day</button>
          <h1>{date.toFormat("dd MMMM yyyy")}</h1>
        </div>
      </div>
      <div id="cal-frame">
        <div className="day">{times}</div>
      </div>
    </div>
  );
}
