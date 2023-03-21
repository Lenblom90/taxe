import { DateTime } from "luxon";
import { useState } from "react";

export default function TaskSchedule({show, handleSchedule} : { show : boolean; handleSchedule: any;}) {

  const [scheduled_on, setScheduled_on] = useState("");
  const onScheduleChange = (e) => {
    setScheduled_on(e.target.value);
    handleSchedule(e.target.value.toISOString());
  }

  if(show){
    return (
    <div className="form-schedule">
      <div> 
        <div>Searchbox</div>
        <select value={scheduled_on} onChange={onScheduleChange} name="selectSchedule">
          <option value={DateTime.now().toFormat('yyyy-MM-dd')}>Today</option>
          <option value={DateTime.now().plus({days : 1 }).toFormat('yyyy-MM-dd')}>Tomorrow</option>
          <option value={DateTime.now().plus({days: 7 }).toFormat('yyyy-MM-dd')}>Next week</option>
          <option value={DateTime.now().plus({ months: 1}).toFormat('yyyy-MM-dd')}>Next month</option>
        </select>
      </div>
      <input value={scheduled_on} onChange={onScheduleChange} type="date"/>
    </div>
  );
  } else {
    return <></>
  }
}
