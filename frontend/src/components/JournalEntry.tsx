import { Entry } from "../types";

export default function JournalEntry({
  entry,
  setEntry,
}: {
  entry: Entry;
  setEntry: any;
}) {
  return (
    <li className="journal-entry">
      <div className="entry-header">
        <button className="entry-date">{entry.date}</button>
        <input
          className="entry-title"
          defaultValue={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
        />
        <button className="entry-mood">Mood</button>
      </div>
      <div className="entry-body">
        <textarea
          defaultValue={entry.text}
          onChange={(e) => setEntry({ ...entry, text: e.target.value })}
        />
      </div>
    </li>
  );
}
