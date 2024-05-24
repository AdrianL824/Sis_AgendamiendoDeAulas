import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import Table_Periodo from "../../../hooks/Table/Table_Periodo";
import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
import { getApi } from "../../../api/api";
import Form_Rango from "../../../hooks/Forms/Form_Rango";
const Page_Periodo = () => {
    const name = "Periodo Reserva";

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [period, setPeriod] = useState({});
    const [edit, setedit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        getProduct()
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
    const handleEdit = (period) => {
        setSelectedProduct(period);
    };
    const handleDelete = (id) => {
        setPeriod((prevPeriod) => prevPeriod.filter((period) => period._id !== id));
    };
    const handleUpdate = async () => {
        await getProduct();
      };
    async function getProduct() {
        try {
          const productsData = await getApi(
            "http://localhost:8080/api/period/period"
          );
          setPeriod(productsData.period);
          console.log(productsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    return(
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
                        <Table_Periodo
                            period={period}
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
            <Form_Rango
              onClose={closeDrawer}
              selectedProduct={selectedProduct}
              edit={edit}
              getProduct={getProduct}
            />
          }
        />
      </div>
        </Admin>
    )
}

export default Page_Periodo;
