import { DateTime } from "luxon";
import { useState } from "react";

export default function TaskSchedule({
  show,
  scheduled_day,
  handleSchedule,
}: {
  show: boolean;
  handleSchedule: any;
  scheduled_day: string | undefined;
}) {
  const [scheduled_on, setScheduled_on] = useState(
    DateTime.fromISO(scheduled_day).toFormat("yyyy-MM-dd")
  );
  const onScheduleChange = (e) => {
    handleSchedule(
      DateTime.fromFormat(e.target.value, "yyyy-MM-dd", { zone: "UTC" })
        .plus({ hour: 8 })
        .toISO()
    );
    setScheduled_on(e.target.value);
  };

  if (show) {
    return (
      <div className="form-schedule">
        <div>
          <div>Searchbox</div>
          <select
            value={scheduled_on}
            onChange={onScheduleChange}
            name="selectSchedule"
          >
            <option value={DateTime.now().toFormat("yyyy-MM-dd")}>Today</option>
            <option
              value={DateTime.now().plus({ days: 1 }).toFormat("yyyy-MM-dd")}
            >
              Tomorrow
            </option>
            <option
              value={DateTime.now().plus({ days: 7 }).toFormat("yyyy-MM-dd")}
            >
              Next week
            </option>
            <option
              value={DateTime.now().plus({ months: 1 }).toFormat("yyyy-MM-dd")}
            >
              Next month
            </option>
          </select>
        </div>
        <input value={scheduled_on} onChange={onScheduleChange} type="date" />
      </div>
    );
  } else {
    return <></>;
  }
}
