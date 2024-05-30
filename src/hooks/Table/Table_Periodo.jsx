import { useState } from "react";
import Box from "@mui/joy/Box";
import PropTypes from "prop-types";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Drawer_User from "../Drawer/Drawer";
import Form_Periodo from "../Forms/Form_Periodo";
import { deleteApi } from "../../api/api";

export default function Table_Periodo({ period, onDelete, onUpdate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [data, setData] = useState(Object.values(period));

  const handleEditClick = (period) => {
    setSelectedPeriod(period);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedPeriod(null);
  };

  const handleDelete = async (index, id) => {
    console.log(id);
    const route = `http://localhost:8080/api/period/perioddel/${id}`; // Ajusta la ruta según corresponda
    try {
      await deleteApi(route);
      setData((prevData) => prevData.filter((_, i) => i !== index));
      onDelete(id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };
  const handleUpdate = () => {
    onUpdate();
    handleDrawerClose();
  };
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Sheet
          variant="outlined"
          sx={{
            "--TableCell-height": "40px",
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            "--Table-firstColumnWidth": "30px",
            "--Table-lastColumnWidth": "px",
            "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
            "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
            overflow: "auto",
            background: (theme) =>
              `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
              linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
              radial-gradient(
                farthest-side at 0 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              ),
              radial-gradient(
                  farthest-side at 100% 50%,
                  rgba(0, 0, 0, 0.12),
                  rgba(0, 0, 0, 0)
                )
                0 100%`,
            backgroundSize:
              "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "local, local, scroll, scroll",
            backgroundPosition:
              "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
            backgroundColor: "background.surface",
          }}
        >
          <Table
            borderAxis="bothBetween"
            stripe="odd"
            hoverRow
            sx={{
              "& tr > *:first-of-type": {
                position: "sticky",
                left: 0,
                boxShadow: "1px 0 var(--TableCell-borderColor)",
                bgcolor: "background.surface",
              },
              "& tr > *:last-child": {
                position: "sticky",
                right: 0,
                bgcolor: "var(--TableCell-headBackground)",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 25 }}>#</th>
                <th style={{ width: 150 }}>Nombre</th>
                <th style={{ width: 150 }}>Fecha Inicial Reserva</th>
                <th style={{ width: 150 }}>Fecha Final Reserva</th>
                <th style={{ width: 150 }}>Fecha Inicial Examen</th>
                <th style={{ width: 150 }}>Fecha Final Examen</th>
                <th style={{ width: 150 }}>Cargo</th>
                <th style={{ width: 100, textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {Object.values(period).map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.date_r_i}</td>
                  <td>{row.date_r_f}</td>
                  <td>{row.date_e_i}</td>
                  <td>{row.date_e_f}</td>
                  <td>{row.role}</td>
                  <td style={{ alignContent: "center", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => handleEditClick(row)}
                        size="sm"
                        variant="plain"
                        color="neutral"
                      >
                        <EditIcon fontSize="inherit" />
                      </Button>
                      <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                        onClick={() => handleDelete(index, row._id)} // Asegúrate de que cada fila tenga un ID
                      >
                        <DeleteIcon fontSize="inherit" />
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Typography level="body-sm" textAlign="center" sx={{ pb: 2 }}>
          ← - →
        </Typography>
      </Box>
      <Drawer_User
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
        edit={true}
        name="Periodo"
        form={
          <Form_Periodo
            initialValues={selectedPeriod}
            onClose={handleUpdate}
            edit={true}
          />
        }
      />
    </Box>
  );
}

Table_Periodo.propTypes = {
  period: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onUpdate: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onDelete: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
