import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getApi } from "../../api/api";
import RegisterModal from "../Modal/Modal.jsx";
import "./Calendar.css";

function Calendar({ title, block, capacity, webaddress }) {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    getReserva();
  }, []);

  async function getReserva() {
    try {
      const response = await getApi(
        `http://localhost:8080/api/book/single-book/${title}`
      );

      const scheduleRanges = {
        A: { start: "06:45:00", end: "08:15:00" },
        B: { start: "08:15:00", end: "09:45:00" },
        C: { start: "09:45:00", end: "11:15:00" },
        D: { start: "11:15:00", end: "12:45:00" },
        E: { start: "12:45:00", end: "14:15:00" },
        F: { start: "14:15:00", end: "15:45:00" },
        G: { start: "15:45:00", end: "17:15:00" },
        H: { start: "17:15:00", end: "18:45:00" },
        I: { start: "18:45:00", end: "20:15:00" },
        J: { start: "20:15:00", end: "21:45:00" },
      };

      const mappedEvents = response.book.map((event) => {
        const { date, schedule } = event;
        const { start: startTime, end: endTime } = scheduleRanges[schedule];
        const start = `${date.substring(0, 10)}T${startTime}`;
        const end = `${date.substring(0, 10)}T${endTime}`;

        return {
          title: event.name_teacher,
          start,
          end,
          resourceId: event.name,
        };
      });

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }

  const handleClickOpen = (selectedInfo) => {
    // console.log(selectedInfo);
    setOpen(true);
    setTarget({
      startDate: selectedInfo.startStr.substring(0, 10),
      startTime: selectedInfo.startStr.substring(11, 19),
      endTime: selectedInfo.endStr.substring(11, 19),
      slug: title,
      block: block,
      capacity: capacity,
      webaddress: webaddress,
    });
  };

  return (
    <>
      <div className="calendarTitle">
        <h2>{title}</h2>
      </div>
      <FullCalendar
        timeZone="Z"
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
        locale={"es"}
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
      {open && (
        <RegisterModal
          setOpen={setOpen}
          target={target}
          getReserva={getReserva}
        />
      )}
    </>
  );
}

export default Calendar;
