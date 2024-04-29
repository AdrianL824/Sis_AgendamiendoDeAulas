// import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import {
  ImgCard2Styles,
  ImgCardStyles,
  cardStyles,
  containerStyles,
} from "./HomeStyles";
const CardsHome = () => {
  return (
    <Grid container spacing={2}>
      {/* Primer componente Grid */}
      <Grid item xs={12} md={6} lg={3}>
        <Grid container style={containerStyles}>
          <Grid item xs={12}>
            <Card
              sx={{
                ...cardStyles,
                backgroundImage:
                  "linear-gradient(to right, #232772, #323c80, #42518d, #55679a, #6a7ca5, #7f8db0, #949fba, #a9b1c5, #c0c4d3, #d6d7e1, #ebebf0, #ffffff)",
                color: "white",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Card 1
                </Typography>
                <Typography variant="subtitle1" color="" component="div">
                  150
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ ...ImgCardStyles, filter: "grayscale(100%)" }} // Cambia el valor a grayscale(100%)
                image="https://cdn-icons-png.flaticon.com/512/1170/1170679.png"
                alt="#1"
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Segundo componente Grid */}
      <Grid item xs={12} md={6} lg={3}>
        <Grid container style={containerStyles}>
          <Grid item xs={12}>
            <Card
              sx={{
                ...cardStyles,
                backgroundImage:
                  "linear-gradient(to right, #232772, #323c80, #42518d, #55679a, #6a7ca5, #7f8db0, #949fba, #a9b1c5, #c0c4d3, #d6d7e1, #ebebf0, #ffffff)",
                color: "white",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Card 1
                </Typography>
                <Typography variant="subtitle1" color="" component="div">
                  150
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ ...ImgCardStyles, filter: "grayscale(100%)" }} // Cambia el valor a grayscale(100%)
                image="https://cdn-icons-png.flaticon.com/512/1170/1170679.png"
                alt="#1"
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Tercer componente Grid */}
      <Grid item xs={12} md={6} lg={3}>
        <Grid container style={containerStyles}>
          <Grid item xs={12}>
            <Card
              sx={{
                ...cardStyles,
                backgroundImage:
                  "linear-gradient(to right, #232772, #323c80, #42518d, #55679a, #6a7ca5, #7f8db0, #949fba, #a9b1c5, #c0c4d3, #d6d7e1, #ebebf0, #ffffff)",
                color: "white",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Card 1
                </Typography>
                <Typography variant="subtitle1" color="" component="div">
                  150
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ ...ImgCardStyles, filter: "grayscale(100%)" }} // Cambia el valor a grayscale(100%)
                image="https://cdn-icons-png.flaticon.com/512/1170/1170679.png"
                alt="#1"
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Cuarto componente Grid */}
      <Grid item xs={12} md={6} lg={3}>
        <Grid container justifyContent="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: 43,
                  display: "flex",
                  alignItems: "center",
                  backgroundImage:
                    "linear-gradient(to right, #42690e, #2a8558, #339c94, #6eb0bf, #abc2d5, #c4cddc, #d8dae2, #e8e8e8, #eeeeee, #f3f3f3, #f9f9f9, #ffffff)",
                  color: "white",
                  borderRadius: 5,
                  margin: "2px 4px ",
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h7">
                    -----------
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ ...ImgCard2Styles }}
                  image="https://cdn-icons-png.flaticon.com/512/1170/1170679.png"
                  alt="Live from space album cover"
                />
              </Card>
              <Card
                sx={{
                  width: "100%",
                  height: 43,
                  display: "flex",
                  alignItems: "center",
                  backgroundImage:
                    "linear-gradient(to right, #42690e, #2a8558, #339c94, #6eb0bf, #abc2d5, #c4cddc, #d8dae2, #e8e8e8, #eeeeee, #f3f3f3, #f9f9f9, #ffffff)",
                  color: "white",
                  borderRadius: 5,
                  margin: "2px 4px ",
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h7">
                    ---------------------
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ ...ImgCard2Styles }}
                  image="https://cdn-icons-png.flaticon.com/512/1170/1170679.png"
                  alt="Live from space album cover"
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardsHome;
