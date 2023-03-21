import "../styles/Calendar.css";
import { Calendar } from "../lib/CustomCalendar";

export default function MyFirstCalendar({dragTask, events }) {
  return (
    <Calendar dragTask={dragTask} events={events}/>
    )
}