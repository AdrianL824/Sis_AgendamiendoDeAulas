import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography, Box } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import { DatePickerDemo } from "./DatePickerDemo";
import { Button } from "@/components/ui/button";

const Page_Reportes = () => {
  const name = "Informes por fecha - Reservas FCYT";

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

        {/* Date Picker Section */}
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ marginTop: "1rem", marginLeft: "6rem", marginBottom: "1rem" }}
          >
            Entre las fechas:
          </Typography>
        </Grid>

        {/* Date Picker and Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <DatePickerDemo className="mr-4 mt-0" />
            <Button>Buscar</Button>
          </Box>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default Page_Reportes;
