import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
// import Table_Ambiente from "../../../hooks/Table/Table_Ambiente";
// import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
import { getApi } from "../../../api/api";

// import Form_Ambiente from "../../../hooks/Forms/Form_Ambiente";
import Form_EditarAlumnos from "../../../hooks/Forms/Form_EditarAlumnos";
import Table_Alumnos from "../../../hooks/Table/Table_Alumnos";

const Page_Alumnos = () => {
  const name = "Materias";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [space, setSpace] = useState({});
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getProduct();
    getUserData();
    getAdminData();
  }, []);
  //   const [radio, setradio] = useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const editTrue = () => {
    setedit(true);
  };

  //   const editFalse = () => {
  //     setedit(false);
  //   };
  //   const handleChange = () => {
  //     setradio(!radio);
  //   };
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

  async function getUserData(username) {
    const url = `http://localhost:8080/api/user/singleuser/${username}`;

    try {
      const response = await getApi(url);
      console.log("Datos obtenidos:", response);
      setUserData(response);
      //   updateNamesMaterias(response.DAUser, false);
    } catch (error) {
      console.error(`Error fetching data for user ${username}:`, error);
    }
  }

  async function getAdminData(username) {
    const url = `http://localhost:8080/api/user/user/`;

    try {
      const response = await getApi(url);
      console.log("Datos obtenidos:", response);
      setUserData(response.DAUser);
      //   updateNamesMaterias(response.DAUser, true);
    } catch (error) {
      console.error(`Error fetching data for admin ${username}:`, error);
    }
  }

  const handleEdit = (space) => {
    setSelectedProduct(space);
  };

  const handleDelete = (id) => {
    setSpace((prevSpace) => prevSpace.filter((space) => space._id !== id));
  };

  const handleUpdate = async () => {
    await getAdminData();
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Table_Alumnos
                userData={userData}
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
            <Form_EditarAlumnos
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

export default Page_Alumnos;
