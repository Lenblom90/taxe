import "../styles/Calendar.css";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function MyFirstCalendar() {
  return (
    <FullCalendar events={[]} droppable={true} plugins={[ timeGridPlugin, interactionPlugin ]} initialView="timeGridDay" headerToolbar={{left: 'prev,next', center: 'title', right:'timeGridDay, timeGridWeek'}} />
  )
}