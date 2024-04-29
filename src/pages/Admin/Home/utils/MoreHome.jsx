// import React from "react";

import {
  Card,
  Grid,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Stack,
  Typography,
} from "@mui/material";

import { containerChartStyles } from "./HomeStyles";

const Products = [
  { name: "Aula X", stock: 5 },
  { name: "Aula Y", stock: 3 },
  { name: "Aula Z", stock: 2 },
  // ...otros productos
];
export function MoreHome() {
  return (
    <Grid container spacing={2}>
      {/* Primer componente Grid */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container style={containerChartStyles}>
          <Grid item xs={12}>
            <Card>
              <Stack direction="column">
                <Typography variant="h6" sx={{ margin: 2 }}>
                  Aulas mas requeridas
                </Typography>
                <CardContent sx={{ marginTop: 0 }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell align="center">Cantidad</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell align="center">
                              {product.stock}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Segundo componente Grid */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container style={containerChartStyles}>
          <Grid item xs={12}>
            <Card>
              <Stack direction="column">
                <Typography variant="h6" sx={{ margin: 2 }}>
                  Aulas menos requeridas
                </Typography>
                <CardContent sx={{ marginTop: 0 }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell align="center">Cantidad</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell align="center">
                              {product.stock}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
