import { useState } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "aula", label: "Aula", width: 170 },
  { id: "docente", label: "Docente", width: 170 },
  { id: "fecha", label: "Fecha de Reserva", width: 170 },
  { id: "horario", label: "Horario de Reserva", width: 170 },
  {
    id: "fechaCreacion",
    label: "Fecha de Creación",
    width: 170,
  },
];

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

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US");
}

function getScheduleRange(schedule) {
  const range = scheduleRanges[schedule];
  return range ? `${range.start} - ${range.end}` : "N/A";
}

export default function Table_Periodo_List({ books }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 &&
              books
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell style={{ width: columns[0].width }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: columns[1].width }}>
                      {row.name_teacher}
                    </TableCell>
                    <TableCell style={{ width: columns[2].width }}>
                      {formatDate(row.date)}
                    </TableCell>
                    <TableCell style={{ width: columns[3].width }}>
                      {getScheduleRange(row.schedule)}
                    </TableCell>
                    <TableCell style={{ width: columns[4].width }}>
                      {formatDateTime(row.createdAt) +
                        "  " +
                        formatTime(row.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

Table_Periodo_List.propTypes = {
  books: PropTypes.array.isRequired,
};
