import React from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography, Box } from "@mui/material";
import { DatePickerDemo } from "./DatePickerDemo";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { addDays, format } from "date-fns";

const Page_Reportes = () => {
  const name = "Informes por fecha - Reservas FCYT";

  const [selectedDate, setSelectedDate] = React.useState({
    from: new Date(2024, 4, 20),
    to: addDays(new Date(2024, 4, 5), 20),
  });

  const [mostReservedRoom, setMostReservedRoom] = React.useState(null);
  const [mostReservedTeacher, setMostReservedTeacher] = React.useState(null);

  const fetchMostReservedRoom = async (from, to) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/book/most-reserved-room/${from}/${to}`
      );
      const data = await response.json();
      if (data.success) {
        setMostReservedRoom(data);
      } else {
        setMostReservedRoom(null); // Reset in case of an unsuccessful response
      }
    } catch (error) {
      console.error("Error fetching most reserved room:", error);
      setMostReservedRoom(null);
    }
  };

  const fetchMostReservedTeacher = async (from, to) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/book/most-reserved-teacher/${from}/${to}`
      );
      const data = await response.json();
      if (data.success) {
        setMostReservedTeacher(data);
      } else {
        setMostReservedTeacher(null); // Reset in case of an unsuccessful response
      }
    } catch (error) {
      console.error("Error fetching most reserved teacher:", error);
      setMostReservedTeacher(null);
    }
  };

  const handleFetchData = () => {
    const fromDate = format(selectedDate.from, "yyyy-MM-dd");
    const toDate = format(selectedDate.to, "yyyy-MM-dd");

    fetchMostReservedRoom(fromDate, toDate);
    fetchMostReservedTeacher(fromDate, toDate);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    doc.setFontSize(20);
    doc.text(name, 10, 20);

    doc.setFontSize(18);
    doc.text("Entre las fechas", 10, 40);
    doc.text(`Desde: ${format(selectedDate.from, "dd-MM-yyyy")}`, 10, 50);
    doc.text(`Hasta: ${format(selectedDate.to, "dd-MM-yyyy")}`, 10, 60);

    doc.setFontSize(14);
    doc.text("Ambientes", 10, 70);
    doc.text(
      `Ambiente con más reservas: ${
        mostReservedRoom ? mostReservedRoom.room : "No disponible"
      }`,
      10,
      80
    );
    doc.text(
      `Número de reservas: ${
        mostReservedRoom ? mostReservedRoom.reservationCount : "No disponible"
      }`,
      10,
      90
    );

    doc.text("Docentes", 10, 110);
    doc.text(
      `Docente con más reservas: ${
        mostReservedTeacher ? mostReservedTeacher.room : "No disponible"
      }`,
      10,
      120
    );
    doc.text(
      `Número de reservas: ${
        mostReservedTeacher
          ? mostReservedTeacher.reservationCount
          : "No disponible"
      }`,
      10,
      130
    );

    doc.save(`reporte_${formattedDate}.pdf`);
  };

  return (
    <Admin>
      <Grid container spacing={2} justifyContent="center">
        {/* Header */}
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ borderBottom: "2px solid black", width: "100%" }}
          >
            {name}
          </Typography>
        </Grid>

        {/* Date Picker*/}
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ marginTop: "3rem", marginLeft: "6rem", marginBottom: "1rem" }}
          >
            Entre las fechas:
          </Typography>
        </Grid>

        {/* Date Picker*/}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <DatePickerDemo
              date={selectedDate}
              onSelect={setSelectedDate}
              className="mr-4 mt-0"
            />
            <Button onClick={handleFetchData}>Buscar</Button>
          </Box>
        </Grid>

        <Grid id="report-content" item xs={12}>
          {/* Para los cards - Ambientes*/}
          <Typography
            variant="h6"
            sx={{ marginTop: "2rem", marginLeft: "15rem" }}
          >
            Ambientes
          </Typography>
          {/* Card */}
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 className="text-lg  text-gray-400 dark:text-white">
                  Ambiente con más reservas:{" "}
                  {mostReservedRoom ? <>{mostReservedRoom.room}</> : <></>}
                </h3>
              </div>
              <div className="p-4 md:p-3">
                <p className="text-lg  text-gray-400 dark:text-white ml-2">
                  Número de reservas:{" "}
                  {mostReservedRoom ? (
                    <>{mostReservedRoom.reservationCount}</>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Para los cards - Docentes*/}
          <Typography
            variant="h6"
            sx={{ marginTop: "3rem", marginLeft: "15rem" }}
          >
            Docentes
          </Typography>
          {/* Card */}
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 className="text-lg  text-gray-400 dark:text-white">
                  Docente con más reservas:{" "}
                  {mostReservedTeacher ? (
                    <>{mostReservedTeacher.room}</>
                  ) : (
                    <></>
                  )}
                </h3>
              </div>
              <div className="p-4 md:p-3">
                <p className="text-lg  text-gray-400 dark:text-white ml-2">
                  Número de reservas:{" "}
                  {mostReservedTeacher ? (
                    <>{mostReservedTeacher.reservationCount}</>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Button exportar*/}
          <Grid
            item
            xs={30}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "15rem",
            }}
          >
            <Button onClick={exportToPDF}>Exportar a PDF</Button>
          </Grid>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default Page_Reportes;
