import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getApi } from "../../api/api";
import RegisterModal from "../Modal/Modal.jsx";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    getReserva();
  }, []);

  async function getReserva() {
    try {
      const booksData = await getApi("http://localhost:8080/api/book/books");
      const mappedEvents = booksData.book.map((event) => ({
        title: event.name,
        description: `${event.name_teacher} - ${event.schedule}`,
        start: event.date,
        end: event.endDate, // Agregamos la fecha de finalización si está disponible
      }));
      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleClickOpen = (selectedInfo) => {
    setOpen(true);
    setTarget({
      startDate: selectedInfo.startStr,
      endDate: selectedInfo.endStr,
      startTime: selectedInfo.startStr.substring(11, 16),
      endTime: selectedInfo.endStr.substring(11, 16),
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "timeGridWeek,dayGridMonth",
        }}
        height={"110vh"}
        events={events}
        eventContent={(arg) => {
          return (
            <div>
              <b>{arg.timeText}</b>
              <p>{arg.event.title}</p>
              <p>{arg.event.extendedProps.description}</p>
            </div>
          );
        }}
        slotDuration="01:30:00"
        slotLabelInterval="01:30"
        slotMinTime="06:45:00"
        slotMaxTime="21:45:00"
        expandRows={true}
        allDaySlot={false}
        nowIndicator={false}
        selectable={true}
        selectMirror={true}
        select={handleClickOpen}
      />
      {open && <RegisterModal setOpen={setOpen} target={target} />}
    </div>
  );
}

export default Calendar;
