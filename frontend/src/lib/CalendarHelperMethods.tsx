import { DateTime } from "luxon";
import { Task } from "../types";

export function MonthView({
  currentDate,
  setDate,
  currentYear,
  setCalView,
}: {
  currentDate: DateTime;
  setDate: any;
  currentYear: Array<Array<object>>;
  setCalView: any;
}) {
  const switchMonth = (forward: boolean) => {
    if (forward) {
      setDate(currentDate.plus({ months: 1 }));
    } else {
      setDate(currentDate.minus({ months: 1 }));
    }
  };

  const month = currentYear[currentDate.month];
  const firstDay = currentDate.set({ day: 1 }).weekday;

  const dates = month.map((day: any, index: number) => {
    return (
      <td
        key={index}
        onClick={() => {
          setDate(
            DateTime.fromObject({
              year: day.year,
              month: day.month,
              day: day.date,
            })
          );
          setCalView("day");
        }}
      >
        {day.date}
      </td>
    );
  });
  for (let i = 0; i < firstDay - 1; i++) {
    dates.unshift(<td></td>);
  }
  return (
    <div id="cal" className="calendar">
      <div className="cal-header">
        <div className="cal-nav">
          <button onClick={() => setCalView("month")}>Month</button>
          <button onClick={() => setCalView("week")}>Week</button>
          <button onClick={() => setCalView("day")}>Day</button>
        </div>
        <span
          className="left button"
          id="prev"
          onClick={() => switchMonth(false)}
        >
          &lang;
        </span>
        <span className="month-year" id="label">
          {currentDate.month + 1 + " " + currentDate.year}
        </span>
        <span
          className="right button"
          id="next"
          onClick={() => switchMonth(true)}
        >
          &rang;
        </span>
      </div>
      <div id="cal-frame">
        <table className="month">
          <thead id="cal-days">
            <tr>
              <th>mon</th>
              <th>tue</th>
              <th>wed</th>
              <th>thu</th>
              <th>fri</th>
              <th>sat</th>
              <th>sun</th>
            </tr>
          </thead>
          <tbody className="month-rows">
            <tr>{dates.slice(0, 7)}</tr>
            <tr>{dates.slice(7, 14)}</tr>
            <tr>{dates.slice(14, 21)}</tr>
            <tr>{dates.slice(21, 28)}</tr>
            <tr>{dates.slice(28)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WeekView({
  currentDate,
  setCalView,
  setDate,
}: {
  currentDate: DateTime;
  setCalView: any;
  setDate: any;
}) {
  const week = [
    <td></td>,
    <td></td>,
    <td></td>,
    <td></td>,
    <td></td>,
    <td></td>,
    <td></td>,
  ];
  week.map((day, index) => {
    const position = index - currentDate.weekday + 1;
    const date = currentDate.day + position;
    if (date > 0) {
      week[index] = (
        <td
          onClick={() => {
            setDate(
              DateTime.fromObject({
                year: currentDate.year,
                month: currentDate.month,
                day: date,
              })
            );
            setCalView("day");
          }}
          key={index}
        >
          {date}
        </td>
      );
    }
  });
  return (
    <div id="cal" className="calendar">
      <div className="cal-header">
        <div className="cal-nav">
          <button onClick={() => setCalView("month")}>Month</button>
          <button onClick={() => setCalView("week")}>Week</button>
          <button onClick={() => setCalView("day")}>Day</button>
        </div>
      </div>
      <div id="cal-frame">
        <table className="week">
          <thead>
            <tr>
              <th>mon</th>
              <th>tue</th>
              <th>wed</th>
              <th>thu</th>
              <th>fri</th>
              <th>sat</th>
              <th>sun</th>
            </tr>
          </thead>
          <tbody>
            <tr className="week-row">{week}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const yearArray = (date: DateTime) => {
  const leapYear = date.isInLeapYear;
  const months = [
    31,
    leapYear ? 28 : 29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const currentYear: {
    date: number;
    month: number;
    year: number;
    events: Task[];
  }[][] = [];
  months.forEach((monthDays, index) => {
    currentYear.push(monthArray(index + 1, monthDays, date.year));
  });
  return currentYear;
};

const monthArray = (month: number, days: number, year: number) => {
  const array: { date: number; month: number; year: number; events: Task[] }[] =
    [];
  for (let i = 0; i < days; i++) {
    array[i] = {
      date: i + 1,
      month: month,
      year: year,
      events: [],
    };
  }
  return array;
};
