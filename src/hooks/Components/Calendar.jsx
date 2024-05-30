import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getApi } from "../../api/api";
import RegisterModal from "../Modal/Modal.jsx";
import "./Calendar.css";
import { useAuth0 } from "@auth0/auth0-react";

function Calendar({ title, block, capacity, webaddress, inputDate, setInputDate }) { 
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const [reservaInicio, setReservaInicio] = useState(null);
  const [reservaFin, setReservaFin] = useState(null);

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
    let today = inputDate ? new Date(inputDate) : new Date();
    const reservaInicioFormateado = reservaInicio.toISOString().split('T')[0].replace(/-/g, '/');
    const reservaFinFormateado = reservaFin.toISOString().split('T')[0].replace(/-/g, '/');

    if (today < reservaInicio || today > reservaFin) {
      if (today < reservaInicio) {
        alert(`El período de reserva es del ${reservaInicioFormateado} al ${reservaFinFormateado}`);
      } else {
        alert("El período de reservas ha terminado");
      }
      return;
    }

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

  const selectAllow = (selectInfo) => {
    const startDate = new Date(reservaFin);
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 14);

    const selectedStartDate = new Date(selectInfo.startStr);
    const selectedEndDate = new Date(selectInfo.endStr);

    return selectedStartDate >= startDate && selectedEndDate <= endDate;
  };

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const userRole = getRoleFromEmail(user.email);
      if (userRole === "Docente"|| userRole === "Auxiliares")   {
        getUserData(userRole);
      }
    }
  }, [isAuthenticated, user]);

  const [userData, setUserData] = useState(null);

  const getRoleFromEmail = (email) => {
    if (email.includes("admin")) {
      return "Docente";
    } else if (email.includes("docente")) {
      return "Docente";
    } else if (email.includes("auxiliar")) {
      return "Auxiliares";
    } else {
      return "Unknown Role";
    }
  };

  async function getUserData(userRole) {
    const url = `http://localhost:8080/api/period/singleperiod/${userRole}`;
    try {
      const response = await getApi(url);
      console.log("Datos obtenidos para usuario:", response);
      
      const { period } = response;
      if (period && period.length > 0) {
        const { date_r_i, date_r_f } = period[0];
        setReservaInicio(new Date(date_r_i));
        setReservaFin(new Date(date_r_f));
      }

      setUserData(response);
    } catch (error) {
      console.error(`Error fetching data for user ${userRole}:`, error);
    }
  }

  return (
    <>
      {/* <input
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        placeholder="YYYY-MM-DD"
      /> */}
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
        selectAllow={selectAllow}
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
