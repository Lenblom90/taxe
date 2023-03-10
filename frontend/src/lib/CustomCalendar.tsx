import { useState } from "react";
import { Task } from "../types";


function DayView({
    date,
    setView,
    events,
    dragTask
  }: {
    date: Date;
    setView: any;
    events: Task[];
    dragTask: Task;
  }) {
    const hours = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24
    ];
      
    const onDrop = (e) => {
      e.target.textContent = dragTask.name;
    };
  
    const times = hours.map((hour) => {
      const event = events.find((x) => {
        const start = new Date(Date.parse(x.scheduled_on)).getHours();
        const end = start + 1;
        return start <= hour && end >= hour
      });
      return (
        <tr         onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event)}
          key={hour}
          className="day-row"
        >
          <td>{hour}</td>
          <td>{event ? event.name : null}</td>
        </tr>
      );
    });
  
    const onDragOver = (event) => {
      event.preventDefault();
    };
  
    return (
      <div
        id="cal"
        className="calendar"
      >
        <div className="cal-header">
          <div className="cal-nav">
            <button onClick={() => setView("month")}>Month</button>
            <button onClick={() => setView("week")}>Week</button>
            <button onClick={() => setView("day")}>Day</button>
            <h1>{date.toDateString()}</h1>
          </div>
        </div>
        <div id="cal-frame">
          <table className="day">
            <tbody>{times}</tbody>
          </table>
        </div>
      </div>
    );
  }
  
function MonthView({ currentDate, setDate, currentYear, setCalView }) {
    const switchMonth = (forward: boolean) => {
      if (forward) {
        if (currentDate.getMonth() < 12) {
          setDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              currentDate.getDate()
            )
          );
        } else {
          setDate(
            new Date(currentDate.getFullYear() + 1, 1, currentDate.getDate())
          );
        }
      } else {
        if (currentDate.getMonth() > 1) {
          setDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              currentDate.getDate()
            )
          );
        } else {
          setDate(
            new Date(currentDate.getFullYear() - 1, 12, currentDate.getDate())
          );
        }
      }
    };
  
    let month = currentYear[currentDate.getMonth()];
    let firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
  
    const dates = month.map((day: any, index: number) => {
      return (
        <td
          onClick={() => {
            setDate(new Date(day.year, day.month, day.date));
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
            {currentDate.getMonth() + 1 + " " + currentDate.getFullYear()}
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
  
function WeekView({
    currentDate,
    setCalView,
    setDate,
  }: {
    currentDate: Date;
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
      const position = index - currentDate.getDay() + 1;
      const date = currentDate.getDate() + position;
      if (date > 0) {
        week[index] = (
          <td
            onClick={() => {
              setDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), date)
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
  
export function Calendar({dragTask}) {
    const yearArray = (date: Date) => {
      const leapYear = date.getFullYear() % 4;
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
      let currentYear = new Array();
      months.forEach((monthDays, index) => {
        currentYear.push(monthArray(index + 1, monthDays, date.getFullYear()));
      });
      return currentYear;
    };
  
    const monthArray = (month: number, days: number, year: number) => {
      let array = [];
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
  
    const [currentDate, setDate] = useState(new Date());
    const [currentYear, setYear] = useState(yearArray(currentDate));
    const [currentView, setCalView] = useState("day");
    //  currentYear[currentDate.getMonth()][currentDate.getDate()].active = true;
  
    if (currentView === "day") {
      const events = [
        { name: "Party", scheduled_on: new Date(2023,3,10,1).toISOString(), estimate:"2 hours"},
        { name: "Work", scheduled_on: new Date(2023,3,10,7).toISOString(), estimate:"8 hours"},
      ]; //currentYear[currentDate.getMonth()][currentDate.getDate()].events;
      return <DayView date={currentDate} setView={setCalView} events={events} dragTask={dragTask}/>;
    } else if (currentView === "month") {
      return (
        <MonthView
          currentDate={currentDate}
          currentYear={currentYear}
          setDate={setDate}
          setCalView={setCalView}
        />
      );
    } else {
      return (
        <WeekView
          currentDate={currentDate}
          setCalView={setCalView}
          setDate={setDate}
        />
      );
    }
  }
  