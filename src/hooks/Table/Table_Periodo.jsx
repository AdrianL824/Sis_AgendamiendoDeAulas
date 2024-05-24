import React, { useState } from "react";
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

export default function Table_Periodo({ period }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [periods, setPeriods] = useState(period);

  const handleEditClick = (period) => {
    setSelectedPeriod(period);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedPeriod(null);
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
                <th style={{ width: 150 }}>Fecha Inicial</th>
                <th style={{ width: 150 }}>Fecha Final</th>
                <th style={{ width: 150 }}>Cargo</th>
                <th style={{ width: 100, textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {Object.values(period).map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.date_i}</td>
                  <td>{row.date_f}</td>
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
                      <Button size="sm" variant="soft" color="danger">
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
        form={<Form_Periodo initialValues={selectedPeriod} onClose={handleDrawerClose} />}
      />
    </Box>
  );
}

Table_Periodo.propTypes = {
  period: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};