import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import { DatePickerDemo } from "./DatePickerDemo"; // Importa el componente DatePickerDemo

const Page_Reportes = () => {
  const name = "Informes por fecha - Reservas FCYT";

  return (
    <Admin>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                {name}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <DatePickerDemo />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default Page_Reportes;
