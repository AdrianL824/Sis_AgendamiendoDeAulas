import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
//import Table_Ambiente from "../../../hooks/Table/Table_Ambiente";
import Calendar from "../../../hooks/Components/Calendar";
import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
import { getApi } from "../../../api/api";

import Form_Reserva from "../../../hooks/Forms/Form_Reserva";
import Aulas from "../../../hooks/Components/aulas";

const Page_Reserva = () => {
  const name = "Reserva";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [space, setSpace] = useState({});
  const [book, setBook] = useState({});
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    getProduct();
    getReserva();
  }, []);
  const [radio, setradio] = useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const editFalse = () => {
    setedit(false);
  };
  const handleChange = () => {
    setradio(!radio);
  };
  async function getProduct() {
    try {
      const productsData = await getApi(
        "http://localhost:8080/api/space/spaces"
      );
      setSpace(productsData.space);
      console.log(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function getReserva() {
    try {
      const booksData = await getApi("http://localhost:8080/api/book/books");
      setBook(booksData.book);
      console.log(booksData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Admin>
      <Grid container spacing={2}>
        {/* ... */}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                {name}
              </Typography>

              {/* <ButtonProducts
                handleChange={handleChange}
                selectedProduct={selectedProduct}
                openDrawer={openDrawer}
                editFalse={editFalse}
              /> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              {/* <Calendar getReserva={getReserva} /> */}
              <Aulas getReserva={getReserva} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          selectedProduct={selectedProduct}
          edit={edit}
          getProduct={getProduct}
          name={name}
          form={
            <Form_Reserva
              onClose={closeDrawer}
              selectedProduct={selectedProduct}
              edit={edit}
              getProduct={getProduct}
            />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_Reserva;
