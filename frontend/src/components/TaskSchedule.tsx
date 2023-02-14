export default function TaskSchedule() {
  return (
    <div hidden className="form-schedule">
      <div>Searchbox</div>
      <select name="selectSchedule">
        <option>Today</option>
        <option>Tomorrow</option>
        <option>Next week</option>
        <option>Next month</option>
      </select>
      <input type="date"></input>
    </div>
  );
}
