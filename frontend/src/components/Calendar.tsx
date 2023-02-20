import { useState } from "react";

function CalHeader({
  currentDate,
  setYear,
  setDate,
  setCalView,
}: {
  currentDate: Date;
  setDate: any;
  setCalView: any;
}) {
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

  return (
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
        {currentDate.getMonth() + " " + currentDate.getFullYear()}
      </span>
      <span
        className="right button"
        id="next"
        onClick={() => switchMonth(true)}
      >
        &rang;
      </span>
    </div>
  );
}

function CalTable({
  currentDate,
  currentYear,
  currentView,
}: {
  currentDate: Date;
  currentYear: any;
  currentView: string;
}) {
  if (currentView === "day") {
    return <div>{currentDate.toISOString()}</div>;
  } else if (currentView === "month") {
    let month = currentYear[currentDate.getMonth() - 1];
    let firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const dates = month.map((day, index: number) => {
      return <td>{day.date}</td>;
    });
    for (let i = 0; i < firstDay - 1; i++) {
      dates.unshift(<td></td>);
    }
    return (
      <div id="cal-frame">
        <table className="curr">
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
          <tbody>
            <tr>{dates.slice(0, 7)}</tr>
            <tr>{dates.slice(7, 14)}</tr>
            <tr>{dates.slice(14, 21)}</tr>
            <tr>{dates.slice(21, 28)}</tr>
            <tr>{dates.slice(28)}</tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    let week = [
      <td></td>,
      <td></td>,
      <td></td>,
      <td></td>,
      <td></td>,
      <td></td>,
      <td></td>,
    ];
    week.map((day, index) => {
      let position = index - currentDate.getDay() + 1;
      week[index] = <td key={index}>{currentDate.getDate() + position}</td>;
    });
    return (
      <div id="cal-frame">
        <table className="curr">
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
          <tbody>
            <tr>{week}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default function Calendar() {
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
    months.forEach((month, index) => {
      currentYear.push(monthArray(index + 1, month, date.getFullYear()));
    });
    return currentYear;
  };

  const monthArray = (month, days, year) => {
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

  const [calView, setCalView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [thisYear, setYear] = useState(yearArray(date));
  thisYear[date.getMonth()][date.getDate()].active = true;
  return (
    <div id="cal" className="calendar">
      <CalHeader
        currentDate={date}
        setYear={setYear}
        setDate={setDate}
        setCalView={setCalView}
      />
      <CalTable
        currentDate={date}
        currentYear={thisYear}
        currentView={calView}
      />
    </div>
  );
}
