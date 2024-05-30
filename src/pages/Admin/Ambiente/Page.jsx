import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import Table_Ambiente from "../../../hooks/Table/Table_Ambiente";
import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
import { getApi } from "../../../api/api";

import Form_Ambiente from "../../../hooks/Forms/Form_Ambiente";

const Page_Ambiente = () => {
  const name = "Ambiente";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [space, setSpace] = useState({});
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    getProduct();
  }, []);
  const [radio, setradio] = useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const editTrue = () => {
    setedit(true);
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
  const handleEdit = (space) => {
    setSelectedProduct(space);
  };

  const handleDelete = (id) => {
    setSpace((prevSpace) => prevSpace.filter((space) => space._id !== id));
  };

  const handleUpdate = async () => {
    await getProduct();
  };

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

              <ButtonProducts
                handleChange={handleChange}
                selectedProduct={selectedProduct}
                openDrawer={openDrawer}
                editFalse={editFalse}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Table_Ambiente
                space={space}
                handleEdit={handleEdit}
                openDrawer={openDrawer}
                editTrue={editTrue}
                getProduct={getProduct}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
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
            <Form_Ambiente
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

export default Page_Ambiente;
