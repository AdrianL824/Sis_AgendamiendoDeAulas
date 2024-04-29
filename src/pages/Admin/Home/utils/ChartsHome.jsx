// import React from "react";

import { Card, Grid } from "@mui/material";

import { cardChartStyles, containerChartStyles } from "./HomeStyles";
import Pie from "./Charts/Pie";
import Geo from "./Charts/Geo";

export function ChartsHome() {
  return (
    <Grid container spacing={2}>
      {/* Primer componente Grid */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container style={containerChartStyles}>
          <Grid item xs={12}>
            <Card
              sx={{
                ...cardChartStyles,
              }}
            >
              <Pie />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Segundo componente Grid */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container style={containerChartStyles}>
          <Grid item xs={12}>
            <Card
              sx={{
                ...cardChartStyles,
              }}
            >
              <Geo></Geo>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
