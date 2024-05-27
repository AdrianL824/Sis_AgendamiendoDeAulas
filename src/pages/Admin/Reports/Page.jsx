import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography, Box } from "@mui/material";
import { DatePickerDemo } from "./DatePickerDemo";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

const Page_Reportes = () => {
  const name = "Informes por fecha - Reservas FCYT";

  const exportToPDF = () => {
    const element = document.getElementById("report-content");

    html2pdf(element, {
      margin: 1,
      filename: "reporte.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
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

        {/* Button*/}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <DatePickerDemo className="mr-4 mt-0" />
            <Button>Buscar</Button>
          </Box>
        </Grid>

        {/* Report Content */}
        <Grid id="report-content" item xs={12}>
          {/* Para los cards - Ambientes*/}
          <Typography
            variant="h6"
            sx={{ marginTop: "2rem", marginLeft: "15rem" }}
          >
            Ambientes
          </Typography>
          {/* Card */}
          <div class="max-w-lg mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div class="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 class="text-lg  text-gray-400 dark:text-white">
                  Ambiente con más reservas:
                </h3>
              </div>
              <div class="p-4 md:p-3">
                <p class="text-lg  text-gray-400 dark:text-white ml-2">
                  Número de reservas:
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
          <div class="max-w-lg mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div class="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 class="text-lg  text-gray-400 dark:text-white">
                  Docente con más reservas:
                </h3>
              </div>
              <div class="p-4 md:p-3">
                <p class="text-lg  text-gray-400 dark:text-white ml-2">
                  Número de reservas:
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
