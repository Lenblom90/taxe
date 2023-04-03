import { DateTime } from "luxon";
import { useState } from "react";
import { Link } from "react-router-dom";
import JournalEntry from "../components/JournalEntry";
import "../styles/journal.css";

export default function journal() {
  const [entries, setEntries] = useState([
    {
      id: crypto.randomUUID(),
      title: "title",
      text: "",
      date: DateTime.now().toISO(),
    },
  ]);

  const handleEdit = (entry) => {
    const otherEntries = entries.filter((x) => x.id !== entry.id);
    setEntries([...otherEntries, entry]);
  };

  const handleCreate = () => {
    setEntries([
      ...entries,
      {
        id: crypto.randomUUID(),
        title: "",
        date: DateTime.now().toISO(),
        text: "",
      },
    ]);
  };
  return (
    <div className="journal">
      <div className="journal-header">
        <div className="switch">
          <Link to={"/journal"}>Journal</Link>
          <Link to={"/habits"}>Habits</Link>
        </div>
        <div className="score">
          <div className="entries-score">{entries.length} entries</div>
          <div className="streak-score">{entries.length} current streak</div>
          <div className="months-score">
            {entries.filter(
              (x) =>
                DateTime.fromISO(x.date).month == DateTime.now().month &&
                DateTime.fromISO(x.date).year == DateTime.now().year
            ).length + " "}
            month journaling
          </div>
        </div>
        <div className="entries">
          <button>Last 30 entries</button>
          <button onClick={handleCreate}>Add entry</button>
        </div>
      </div>
      <div className="journal-list">
        <ul>
          {entries.map((x, index) => (
            <JournalEntry key={index} entry={x} setEntry={handleEdit} />
          ))}
        </ul>
      </div>
    </div>
  );
}
