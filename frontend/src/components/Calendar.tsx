import "../styles/Calendar.css";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from "../lib/CustomCalendar";
export default function MyFirstCalendar({dragTask}) {
  return (
    //<Calendar events={[]} droppable={true} plugins={[ timeGridPlugin, interactionPlugin ]} initialView="timeGridDay" headerToolbar={{left: 'prev,next', center: 'title', right:'timeGridDay, timeGridWeek'}} />
    <Calendar dragTask={dragTask}/>
    )
}